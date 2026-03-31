import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure upload directory exists
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // already exists or other error handled by recursive: true
    }

    const extension = file.name.split('.').pop();
    const filename = `${randomUUID()}.${extension}`;
    const path = join(uploadDir, filename);

    await writeFile(path, buffer);
    console.log(`Open ${path} to see the uploaded file`);

    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}` 
    });
  } catch (error) {
    console.error('Error during file upload:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
