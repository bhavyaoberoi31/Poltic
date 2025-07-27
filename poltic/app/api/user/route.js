import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/mongoose';
import User from '@/app/models/User';

export async function GET(req) {

  try {
    await connectToDatabase();
    const userId = req.headers.get('x-user-id');
    
    const foundUser = await User.findById(userId).select('-password'); 
    if (!foundUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(foundUser);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}


export async function PUT(req) {
  try {
    const formData = await req.formData();
    const userId = req.headers.get('x-user-id');
    const img = formData.get('img'); 

    if (!img || typeof img === "string") {
      return NextResponse.json({ error: 'No file found in form data' }, { status: 400 });
    }
    
    const arrayBuffer = await img.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `${Date.now()}-${img.name}`;
      

    const uploadRes = await fetch(`${process.env.BUNNY_STORAGE_URL}${fileName}`, {
        method: "PUT",
        headers: {
        AccessKey: process.env.BUNNY_STORAGE_KEY,
        "Content-Type": "application/octet-stream",
        },
        body: buffer,
    });

    if (!uploadRes.ok) {
      return NextResponse.json({ error: 'Thumbnail upload failed' }, { status: 500 });
    }

    await connectToDatabase();
    await User.findByIdAndUpdate(
      userId,
      { profileImgUrl: `https://reels-poltic.b-cdn.net/${fileName}` }, 
      { new: true }
    );

    return NextResponse.json({ message: 'Profile image updated successfully' }, { status: 200 });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}