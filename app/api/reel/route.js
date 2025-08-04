import { NextResponse } from 'next/server';
import Post from '@/app/models/Post';
import connectToDatabase from '@/app/lib/mongoose';

export const maxDuration = 300;

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(request) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const description = formData.get('description');
    const title = formData.get('title');
    const img = formData.get('img');

    if (!file) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;

    const uploadRes = await fetch(`${process.env.BUNNY_STORAGE_URL}${fileName}`, {
      method: 'PUT',
      headers: {
        AccessKey: process.env.BUNNY_STORAGE_KEY,
        'Content-Type': 'application/octet-stream',
      },
      body: fileBuffer,
    });

    if (!uploadRes.ok) {
      return NextResponse.json({ error: 'Video upload failed' }, { status: 500 });
    }

    let thumbnailUrl = null;

    if (img && typeof img === 'string' && img.startsWith('data:image')) {
      const matches = img.match(/^data:(image\/\w+);base64,(.+)$/);
      if (matches) {
        const ext = matches[1].split('/')[1];
        const imageFileName = `${Date.now()}.${ext}`;
        const imgBuffer = Buffer.from(matches[2], 'base64');

        const imgRes = await fetch(`${process.env.BUNNY_STORAGE_URL}${imageFileName}`, {
          method: 'PUT',
          headers: {
            AccessKey: process.env.BUNNY_STORAGE_KEY,
            'Content-Type': 'application/octet-stream',
          },
          body: imgBuffer,
        });

        if (!imgRes.ok) {
          return NextResponse.json({ error: 'Thumbnail upload failed' }, { status: 500 });
        }

        thumbnailUrl = `https://reels-poltic.b-cdn.net/${imageFileName}`;
      }
    }

    await connectToDatabase();

    const post = await Post.create({
      userId,
      videoUrl: `https://reels-poltic.b-cdn.net/${fileName}`,
      thumbnailUrl,
      description,
      title,
    });

    return NextResponse.json({ message: 'Upload successful', post });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
