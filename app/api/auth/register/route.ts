// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type User = { id: string; email: string; name?: string; passwordHash: string };

declare global { var demoUsers: User[] | undefined; }
const users: User[] = globalThis.demoUsers ?? (globalThis.demoUsers = []);

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();
    if (!email || !password) return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });

    const exists = users.find(u => u.email.toLowerCase() === String(email).toLowerCase());
    if (exists) return NextResponse.json({ error: 'User already exists' }, { status: 409 });

    const passwordHash = await hash(String(password), 10);
    const user: User = { id: crypto.randomUUID(), email: String(email).toLowerCase(), name: name ? String(name) : undefined, passwordHash };
    users.push(user);

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email, name: user.name } }, { status: 201 });
  } catch (err) {
    console.error('Register error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
