import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()
    const skills = await db.collection("skills").find({}).sort({ category: 1, name: 1 }).toArray()

    return NextResponse.json({ skills })
  } catch (error) {
    console.error("[v0] Error fetching skills:", error)
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const db = await getDatabase()

    const skill = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("skills").insertOne(skill)

    return NextResponse.json({
      success: true,
      skill: { ...skill, _id: result.insertedId.toString() },
    })
  } catch (error) {
    console.error("[v0] Error creating skill:", error)
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}
