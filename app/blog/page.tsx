"use client"

import { BlogCard } from "@/components/blog-card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import type { BlogPost } from "@/lib/models"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/blog")
        const data = await response.json()
        setPosts(data.posts || [])
      } catch (error) {
        console.error("[v0] Error fetching blog posts:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 pt-16">
        <section className="container px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Blog</h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Thoughts, tutorials, and insights about web development and technology
              </p>
            </div>

            <div className="mb-12">
              <div className="relative mx-auto max-w-xl">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center text-muted-foreground">Loading blog posts...</div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center text-muted-foreground">
                {searchQuery
                  ? "No posts match your search."
                  : "No blog posts found. Add some from the admin dashboard."}
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
