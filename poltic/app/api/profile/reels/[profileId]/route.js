import connectToDatabase from "@/app/lib/mongoose";
import Post from "@/app/models/Post";
import { NextResponse } from "next/server";


export async function GET(req, context) {
  try {
    const userId = await context.params.profileId;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    await connectToDatabase();

    const posts = await Post.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments({ userId });

    return NextResponse.json(
      {
        posts,
        pagination: {
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          total,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}