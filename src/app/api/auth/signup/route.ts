import { NextResponse, type NextRequest } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function adminFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SERVICE_KEY}`,
      apikey: SERVICE_KEY,
      ...options.headers,
    },
  });
  return { res, data: await res.json().catch(() => null) };
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json();

    if (!email || !password || !fullName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    // Try to create user via Admin API (no confirmation email sent)
    const { res: createRes, data: createData } = await adminFetch("/auth/v1/admin/users", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName },
      }),
    });

    if (createRes.ok) {
      return NextResponse.json({ user: createData }, { status: 201 });
    }

    // Create failed — try to find existing user and update them
    const { res: listRes, data: listData } = await adminFetch("/auth/v1/admin/users");

    if (!listRes.ok || !Array.isArray(listData?.users)) {
      return NextResponse.json({ error: "Failed to look up user database" }, { status: 500 });
    }

    const existingUser = listData.users.find(
      (u: any) => u.email?.toLowerCase() === email.toLowerCase()
    );

    if (!existingUser?.id) {
      return NextResponse.json(
        { error: "Account creation failed. Try signing in instead." },
        { status: 409 }
      );
    }

    const userId = existingUser.id;

    // Update auth user: confirm email, update password + metadata
    const { res: updateRes } = await adminFetch(`/auth/v1/admin/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({
        email_confirm: true,
        password,
        user_metadata: { full_name: fullName },
      }),
    });

    if (!updateRes.ok) {
      return NextResponse.json({ error: "Failed to update existing account" }, { status: 500 });
    }

    // Ensure profile exists in public.profiles table
    try {
      const profileCheckRes = await fetch(
        `${SUPABASE_URL}/rest/v1/profiles?user_id=eq.${userId}&select=id`,
        {
          headers: {
            Authorization: `Bearer ${SERVICE_KEY}`,
            apikey: SERVICE_KEY,
            Accept: "application/json",
          },
        }
      );
      const existingProfiles = await profileCheckRes.json();

      if (!Array.isArray(existingProfiles) || existingProfiles.length === 0) {
        await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${SERVICE_KEY}`,
            apikey: SERVICE_KEY,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            user_id: userId,
            email,
            full_name: fullName,
            is_approved: false,
            role: "user",
          }),
        });
      } else {
        await fetch(`${SUPABASE_URL}/rest/v1/profiles?user_id=eq.${userId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${SERVICE_KEY}`,
            apikey: SERVICE_KEY,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({ full_name: fullName }),
        });
      }
    } catch {
      // profile upsert is best-effort
    }

    return NextResponse.json({ user: { id: userId }, updated: true }, { status: 200 });
  } catch (err) {
    console.error("[signup] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
