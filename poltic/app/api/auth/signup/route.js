import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import connectToDatabase from '@/app/lib/mongoose'
import { createToken } from '@/app/lib/jwt';
import User from '@/app/models/User';

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { firstName, lastName, email, password } = body;
    console.log("hello");
    
    if (!firstName || !lastName || !email || !password) {
      console.log("hii");
      
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = createToken(newUser);

    return NextResponse.json({
      message: "User created successfully",
    }, { status: 201 });

  } catch (err) {
    console.log(err);
    
    return NextResponse.json({ message: "Internal Server error." }, { status: 500 });
  }
}
