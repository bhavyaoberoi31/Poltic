import connectToDatabase from "@/app/lib/mongoose";
import User from "@/app/models/User";
import { NextResponse } from "next/server";


export async function GET(req, context) {

  try {
    await connectToDatabase();
    
    const profileId = await context.params.profileId;
      
    const foundUser = await User.findById(profileId).select('-password'); 
    if (!foundUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(foundUser);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}