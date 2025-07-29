import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export async function GET() {
  const token = cookies().get('token')?.value;

  if (!token) {
    return new Response(JSON.stringify({valid: false, error: 'No token' }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return new Response(JSON.stringify({ valid: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ valid: false, error: 'Token expired or invalid' }), { status: 401 });
  }
}
