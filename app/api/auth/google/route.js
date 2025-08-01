import { OAuth2Client } from 'google-auth-library';
import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/mongoose';
import { createToken } from '@/app/lib/jwt';
import User from '@/app/models/User';

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(req) {
  try {
    await connectToDatabase();
    const { token } = await req.json();
    const ticket = await client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    const { email, given_name, family_name } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        firstName: given_name || 'User',
        lastName: family_name || '',
        email,
        password: null,
        isVerified: true,
      });
    } 

    const jwtToken = createToken(user);
    const response =  NextResponse.json({
      message: 'Login successful',
      id: user._id
    }, { status: 200 });
    response.cookies.set({
      name: 'token',
      value: jwtToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60 * 14,
    })
    return response;
  } catch (err) {
    console.log(err);
    
    return NextResponse.json({ message: 'Google login failed' }, { status: 500 });
  }
}