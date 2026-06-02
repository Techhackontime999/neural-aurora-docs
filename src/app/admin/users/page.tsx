"use client";

import { useEffect, useState, useCallback } from "react";
import { Shield, Check, X, RefreshCw, UserCheck, UserX, Trash2 } from "lucide-react";

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
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
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
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

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

  const btnClass = (loading: boolean) =>
    `p-1.5 rounded-lg transition-colors disabled:opacity-50 ${loading ? "animate-pulse" : ""}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Users
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Approve, revoke, or delete user accounts
          </p>
        </div>
        <button
          onClick={fetchUsers}
          className="p-2 rounded-lg text-slate-400 hover:text-aurora-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {error && (
        <div className="p-3 mb-4 rounded-xl bg-red-50/80 dark:bg-red-950/30 border border-red-200/60 dark:border-red-800/60 text-sm text-red-600 dark:text-red-400 backdrop-blur-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-sm text-slate-400">Loading...</div>
      ) : users.length === 0 ? (
        <div className="text-center py-12 text-sm text-slate-400">No users found.</div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">User</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400 hidden sm:table-cell">Joined</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Role</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Status</th>
                <th className="text-right px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aurora-400 to-aurora-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {getInitials(u.full_name || u.email)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-medium">
                          {u.role === "admin" && <Shield className="w-3 h-3 text-amber-500" />}
                          {u.full_name}
                        </div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                    {formatDate(u.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
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
                            className={`${btnClass(actionLoading === u.user_id)} text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30`}
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAction(u.user_id, "reject")}
                            disabled={actionLoading === u.user_id}
                            className={`${btnClass(actionLoading === u.user_id)} text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30`}
                            title="Revoke approval"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleAction(u.user_id, "delete")}
                          disabled={actionLoading === u.user_id}
                          className={`${btnClass(actionLoading === u.user_id)} text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30`}
                          title="Delete user"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {u.role === "admin" && (
                      <span className="text-xs text-slate-400 dark:text-slate-600">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
