import connectToDatabase from "@/app/lib/mongoose";
import Post from "@/app/models/Post";
import { NextResponse } from "next/server";


export async function POST(req) {

    try {
        const formData = await req.formData();
        const file = formData.get("file");
        const description = formData.get("description");
        const title = formData.get("title");
        const img = formData.get("img");
        const userId = req.headers.get('x-user-id');
        let imgRes, imageFileName;
        
        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }
    
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name}`;
        
        const res = await fetch(`${process.env.BUNNY_STORAGE_URL}${fileName}`, {
            method: "PUT",
            headers: {
            AccessKey: process.env.BUNNY_STORAGE_KEY,
            "Content-Type": "application/octet-stream",
            },
            body: buffer,
        });

        if (img && typeof img === "string" && img.startsWith("data:image")) {
          const matches = img.match(/^data:(image\/\w+);base64,(.+)$/);
          if (matches) {
            const mimeType = matches[1];
            const base64Data = matches[2];
            const ext = mimeType.split("/")[1];

            imageFileName = `${Date.now()}.${ext}`;
            const imgBuffer = Buffer.from(base64Data, "base64");

            imgRes = await fetch(`${process.env.BUNNY_STORAGE_URL}${imageFileName}`, {
              method: "PUT",
              headers: {
                AccessKey: process.env.BUNNY_STORAGE_KEY,
                "Content-Type": "application/octet-stream",
              },
              body: imgBuffer,
            });

            if (!imgRes.ok) {
              return NextResponse.json({ error: "Thumbnail upload failed" }, { status: 500 });
            }
          }
        }

        if(!res.ok) {
            return NextResponse.json({ error: "Not able to upload." }, { status: 500 });
        }

        await connectToDatabase()

        const post = await Post.create({
            userId,
            videoUrl: `https://reels-poltic.b-cdn.net/${fileName}`,
            thumbnailUrl: imgRes ? `https://reels-poltic.b-cdn.net/${imageFileName}` : null,
            description,
            title,
        }) 

        return NextResponse.json({ message: "Video uploaded successfully", post }, { status: 200 });

        
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }

}


export async function GET(req) {
  try {
    const userId = req.headers.get("x-user-id");
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
