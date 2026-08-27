// app/api/upload/route.js
import { NextResponse } from 'next/server'
import { uploadImage } from '@/lib/cloudinary'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert file to Buffer for Cloudinary stream upload
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Pass buffer to your helper in lib/cloudinary.js
    const imageUrl = await uploadImage(buffer, 'blog_images')

    return NextResponse.json({ url: imageUrl }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Image upload failed' },
      { status: 500 }
    )
  }
}