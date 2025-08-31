import { type NextRequest, NextResponse } from "next/server"
import { searchPosts } from "@/lib/db-posts"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json([])
    }

    const posts = await searchPosts(query)
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error searching posts:", error)
    return NextResponse.json({ error: "Error searching posts" }, { status: 500 })
  }
}
