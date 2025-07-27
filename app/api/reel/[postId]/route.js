import connectToDatabase from "@/app/lib/mongoose";
import Post from "@/app/models/Post";
import { NextResponse } from "next/server";


export async function GET(req, context) {
    try {
        const postId = context.params.postId;

        await connectToDatabase()

        const post = await Post.findById(postId);

        if(!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
        
        return NextResponse.json({ post }, { status: 200 });
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function DELETE(req, context) {
    try {
        const postId = context.params.postId;
        await connectToDatabase()
        await Post.findByIdAndDelete(postId);
        return NextResponse.json({ message: "Video deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}