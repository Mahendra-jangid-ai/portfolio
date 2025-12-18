// import { type NextRequest, NextResponse } from "next/server"
// import { getDatabase } from "@/lib/mongodb"
// import { ObjectId } from "mongodb"

// export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const body = await request.json()
//     const db = await getDatabase()

//     const result = await db.collection("skills").updateOne(
//       { _id: new ObjectId(params.id) },
//       {
//         $set: {
//           ...body,
//           updatedAt: new Date(),
//         },
//       },
//     )

//     if (result.matchedCount === 0) {
//       return NextResponse.json({ error: "Skill not found" }, { status: 404 })
//     }

//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error("[v0] Error updating skill:", error)
//     return NextResponse.json({ error: "Failed to update skill" }, { status: 500 })
//   }
// }

// export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const db = await getDatabase()

//     const result = await db.collection("skills").deleteOne({
//       _id: new ObjectId(params.id),
//     })

//     if (result.deletedCount === 0) {
//       return NextResponse.json({ error: "Skill not found" }, { status: 404 })
//     }

//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error("[v0] Error deleting skill:", error)
//     return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 })
//   }
// }


import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const db = await getDatabase()

    const result = await db.collection("skills").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...body,
          updatedAt: new Date(),
        },
      }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Skill not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[skills][PUT]", error)
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase()

    const result = await db.collection("skills").deleteOne({
      _id: new ObjectId(params.id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Skill not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[skills][DELETE]", error)
    return NextResponse.json(
      { error: "Failed to delete skill" },
      { status: 500 }
    )
  }
}
