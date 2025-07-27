import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  res.cookies.set('token', '', { httpOnly: true, secure: true, sameSite: 'none', maxAge: 0 });
  return res;
}