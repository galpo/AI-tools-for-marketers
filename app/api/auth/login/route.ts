// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type User = { id: string; email: string; name?: string; passwordHash: string };

declare global { var demoUsers: User[] | undefined; }
const users: User[] =
  globalThis.demoUsers ??
  (globalThis.demoUsers = [
    {
      id: 'demo',
      email: 'demo@example.com',
      name: 'Demo User',
      passwordHash: '$2a$10$CwTycUXWue0Thq9StjUM0uJ8KMuq8.wYQgV4VpI6V3qK3G.N7nWma',
    },
  ]);

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });

    const user = users.find(u => u.email.toLowerCase() === String(email).toLowerCase());
    if (!user) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });

    const ok = await compare(String(password), user.passwordHash);
    if (!ok) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });

    // TODO: issue a real session/JWT
    return NextResponse.json({ success: true, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
