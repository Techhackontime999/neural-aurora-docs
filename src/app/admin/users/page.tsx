"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Shield, Check, X, RefreshCw, UserCheck, UserX, Trash2 } from "lucide-react";
import { useMultiSelect } from "@/hooks/useMultiSelect";
import AdminSearch from "@/components/AdminSearch";
import { containerVariants, itemVariants } from "@/lib/animations";

interface UserRecord {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  role: string;
  is_approved: boolean;
  created_at: string;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.users ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.full_name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.role?.toLowerCase().includes(q)
    );
  }, [users, search]);

  const { selected, allVisibleSelected, toggleOne, toggleAll, clearSelection } = useMultiSelect(filtered);

  const handleAction = async (userId: string, action: "approve" | "reject" | "delete") => {
    if (action === "delete" && !confirm("Delete this user permanently? This cannot be undone.")) return;

    setActionLoading(userId);
    setError(null);
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to update user");
      }
      if (action === "delete") {
        setUsers((prev) => prev.filter((u) => u.user_id !== userId));
      } else {
        setUsers((prev) =>
          prev.map((u) =>
            u.user_id === userId ? { ...u, is_approved: action === "approve" } : u
          )
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setActionLoading(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selected.size === 0) return;
    if (!confirm(`Delete ${selected.size} user${selected.size > 1 ? "s" : ""} permanently? This cannot be undone.`)) return;
    setDeleting(true);
    setError(null);
    try {
      const results = await Promise.allSettled(
        [...selected].map((id) =>
          fetch(`/api/users/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "delete" }),
          })
        )
      );
      const failed = results.filter((r) => r.status === "rejected").length;
      if (failed > 0) setError(`${failed} deletion${failed > 1 ? "s" : ""} failed.`);
      clearSelection();
      fetchUsers();
    } finally {
      setDeleting(false);
    }
  };

  const btnClass = (loading: boolean) =>
    `p-1.5 rounded-lg transition-colors disabled:opacity-50 ${loading ? "animate-pulse" : ""}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Users
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Approve, revoke, or delete user accounts
          </p>
        </div>
        <button
          onClick={fetchUsers}
          className="p-2 rounded-lg hover:text-aurora-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" style={{ color: "var(--text-tertiary)" }}
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 mb-4 rounded-xl bg-red-50/80 dark:bg-red-950/30 border border-red-200/60 dark:border-red-800/60 text-sm backdrop-blur-sm" style={{ color: "var(--accent-glow)" }}
        >
          {error}
        </motion.div>
      )}

      <div className="mb-4">
        <AdminSearch value={search} onChange={setSearch} placeholder="Search by name, email, or role..." />
      </div>

      {selected.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-4 px-4 py-2.5 rounded-lg bg-aurora-50 dark:bg-aurora-950/20 border border-aurora-200 dark:border-aurora-900"
        >
          <span className="text-sm font-medium" style={{ color: "var(--accent-glow)" }}>
            {selected.size} selected
          </span>
          <button
            onClick={handleBulkDelete}
            disabled={deleting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-400 disabled:opacity-50 text-white text-xs font-medium transition-all active:scale-[0.98]"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {deleting ? "Deleting..." : "Delete Selected"}
          </button>
          <button
            onClick={clearSelection}
            className="px-3 py-1.5 rounded-md text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-[0.98]" style={{ border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}
          >
            Clear Selection
          </button>
        </motion.div>
      )}

      {loading ? (
        <div className="text-center py-12 text-sm" style={{ color: "var(--text-tertiary)" }}>Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-sm" style={{ color: "var(--text-tertiary)" }}>
          {search ? "No users match your search." : "No users found."}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="overflow-hidden rounded-2xl" style={{ border: "1px solid var(--border-color)" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                <th className="w-10 px-2 py-3">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={toggleAll}
                    className="rounded border-slate-300 dark:border-slate-600 text-aurora-500 focus:ring-aurora-500"
                  />
                </th>
                <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--text-secondary)" }}>User</th>
                <th className="text-left px-4 py-3 font-medium hidden sm:table-cell" style={{ color: "var(--text-secondary)" }}>Joined</th>
                <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--text-secondary)" }}>Role</th>
                <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--text-secondary)" }}>Status</th>
                <th className="text-right px-4 py-3 font-medium" style={{ color: "var(--text-secondary)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <motion.tr
                  key={u.id}
                  variants={itemVariants}
                  layout
                  className={`last:border-0 transition-colors ${
                    selected.has(u.id)
                      ? "bg-aurora-50/50 dark:bg-aurora-950/10"
                      : "hover:bg-slate-50 dark:hover:bg-slate-900/50"
                  }`} style={{ borderBottom: "1px solid var(--border-color)" }}
                >
                  <td className="px-2 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(u.id)}
                      onChange={() => toggleOne(u.id)}
                      className="rounded border-slate-300 dark:border-slate-600 text-aurora-500 focus:ring-aurora-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aurora-400 to-aurora-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {getInitials(u.full_name || u.email)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 font-medium" style={{ color: "var(--text-primary)" }}>
                          {u.role === "admin" && <Shield className="w-3 h-3 text-amber-500" />}
                          {u.full_name}
                        </div>
                        <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell" style={{ color: "var(--text-secondary)" }}>
                    {formatDate(u.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium uppercase" style={{ color: "var(--text-secondary)" }}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {u.is_approved ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400">
                        <UserCheck className="w-3 h-3" />
                        Approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
                        <UserX className="w-3 h-3" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {u.role !== "admin" && (
                      <div className="flex items-center justify-end gap-1">
                        {!u.is_approved ? (
                          <button
                            onClick={() => handleAction(u.user_id, "approve")}
                            disabled={actionLoading === u.user_id}
                            className={`${btnClass(actionLoading === u.user_id)} hover:bg-green-50 dark:hover:bg-green-950/30`}
                            title="Approve"
                            style={{ color: "var(--accent-glow)" }}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAction(u.user_id, "reject")}
                            disabled={actionLoading === u.user_id}
                            className={`${btnClass(actionLoading === u.user_id)} hover:bg-amber-50 dark:hover:bg-amber-950/30`}
                            style={{ color: "var(--accent-glow)" }}
                            title="Revoke approval"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleAction(u.user_id, "delete")}
                          disabled={actionLoading === u.user_id}
                          className={`${btnClass(actionLoading === u.user_id)} hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30`}
                          style={{ color: "var(--text-tertiary)" }}
                          title="Delete user"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {u.role === "admin" && (
                      <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>—</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
