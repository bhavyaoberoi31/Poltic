import Post from "@/app/models/Post";
import { NextResponse } from "next/server";


export async function POST(req, context) {
    try {
        
        const postId = await context.params.postId;
        if(!postId) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
        await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });
        
        return NextResponse.json({ message: "Video liked successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}