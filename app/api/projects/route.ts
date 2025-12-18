import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()
    const projects = await db.collection("projects").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ projects })
  } catch (error) {
    console.error("[v0] Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const db = await getDatabase()

    const project = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("projects").insertOne(project)

    return NextResponse.json({
      success: true,
      project: { ...project, _id: result.insertedId.toString() },
    })
  } catch (error) {
    console.error("[v0] Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
