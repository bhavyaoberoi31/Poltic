import connectToDatabase from "@/app/lib/mongoose";
import Post from "@/app/models/Post";
import { NextResponse } from "next/server";
import "@/app/models/User";


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    await connectToDatabase();

    const feed = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", 'firstName lastName profileImgUrl' );

    const total = await Post.countDocuments();

    return NextResponse.json(
      {
        feed,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}