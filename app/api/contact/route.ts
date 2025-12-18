import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()
    const messages = await db.collection("contact_messages").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("[v0] Error fetching contact messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const db = await getDatabase()

    const message = {
      ...body,
      status: "unread",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("contact_messages").insertOne(message)

    return NextResponse.json({
      success: true,
      message: { ...message, _id: result.insertedId.toString() },
    })
  } catch (error) {
    console.error("[v0] Error creating contact message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
