import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/mongoose';
import { createToken } from '@/app/lib/jwt';
import User from '@/app/models/User';

export async function POST(req) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();
    const user = await User.findOne({ email });

    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    // if (!user.isVerified) {
    //   await sendEmail(email, user);
    //   return NextResponse.json({ message: 'Please verify your email' }, { status: 400 });
    // }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });

    const token = createToken(user);
    const response =  NextResponse.json({
      message: 'Login successful',
      id: user._id
    }, { status: 200 });

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60* 1000 * 30,
    })

    return response;
  } catch (err) {
    return NextResponse.json({ message: "Internal Server error." }, { status: 500 });
  }
}