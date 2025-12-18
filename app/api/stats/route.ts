import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()

    const [projectsCount, postsCount, skillsCount, messagesCount] = await Promise.all([
      db.collection("projects").countDocuments(),
      db.collection("blog_posts").countDocuments(),
      db.collection("skills").countDocuments(),
      db.collection("contact_messages").countDocuments({ status: "unread" }),
    ])

    return NextResponse.json({
      stats: {
        projects: projectsCount,
        posts: postsCount,
        skills: skillsCount,
        messages: messagesCount,
      },
    })
  } catch (error) {
    console.error("[v0] Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
