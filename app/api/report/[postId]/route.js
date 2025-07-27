import Post from "@/app/models/Post";
import { NextResponse } from "next/server";



export async function POST(context) {
    try {
        const postId = context.params.postId;
        await Post.findByIdAndUpdate(postId, { isReported: true });
        return NextResponse.json({ message: "Video reported successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse({ error: "Something went wrong" }, { status: 500 });
    }
}


export async function GET() {
    try {
        const userId = req.headers.get('x-user-id');

        const reportedReels = await Post.find({ isReported: true, userId });

        return NextResponse.json({ reportedReels }, { status: 200 });
    } catch (error) {
        return NextResponse({ error: "Something went wrong" }, { status: 500 });
    }
}