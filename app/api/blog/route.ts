import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()
    const posts = await db.collection("blog_posts").find({}).sort({ date: -1 }).toArray()

    return NextResponse.json({ posts })
  } catch (error) {
    console.error("[v0] Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const db = await getDatabase()

    const post = {
      ...body,
      date: new Date(body.date || Date.now()),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("blog_posts").insertOne(post)

    return NextResponse.json({
      success: true,
      post: { ...post, _id: result.insertedId.toString() },
    })
  } catch (error) {
    console.error("[v0] Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
