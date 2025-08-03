import formidable from 'formidable';
import fs from 'fs';
import Post from '@/app/models/Post';
import connectToDatabase from '@/app/lib/mongoose';

export const config = {
  api: {
    bodyParser: false, // turn off default parser
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const form = new formidable.IncomingForm({ maxFileSize: 100 * 1024 * 1024 });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Form parsing error' });
    }

    const file = files.file;
    const description = fields.description;
    const title = fields.title;
    const img = fields.img;
    const userId = req.headers['x-user-id'];

    if (!file || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const fileBuffer = fs.readFileSync(file.filepath);
    const fileName = `${Date.now()}-${file.originalFilename}`;

    const uploadRes = await fetch(`${process.env.BUNNY_STORAGE_URL}${fileName}`, {
      method: 'PUT',
      headers: {
        AccessKey: process.env.BUNNY_STORAGE_KEY,
        'Content-Type': 'application/octet-stream',
      },
      body: fileBuffer,
    });

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
          return res.status(500).json({ error: 'Thumbnail upload failed' });
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

    return res.status(200).json({ message: 'Upload successful', post });
  });
}
