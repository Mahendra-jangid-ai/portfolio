"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import type { BlogPost } from "@/lib/models"

export default function BlogPostPage() {
  const params = useParams()
  const id = params?.id as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blog/${id}`)
        if (!response.ok) {
          setNotFound(true)
          return
        }
        const data = await response.json()
        setPost(data.post)
      } catch (error) {
        console.error("[v0] Error fetching blog post:", error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      fetchPost()
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1 pt-16">
          <div className="container px-4 py-16">
            <div className="mx-auto max-w-3xl text-center text-muted-foreground">Loading...</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1 pt-16">
          <div className="container px-4 py-16">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold">Post Not Found</h1>
              <p className="mb-8 text-muted-foreground">The blog post you're looking for doesn't exist.</p>
              <Button asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 pt-16">
        <article className="container px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <Button asChild variant="ghost" className="mb-8">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            <div className="mb-8">
              <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>

              <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>

              <p className="mb-6 text-xl text-muted-foreground">{post.excerpt}</p>

              <div className="mb-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="h-full w-full object-cover" />
              </div>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content.replace(/\n/g, "<br />").replace(/##\s(.+)/g, "<h2>$1</h2>"),
                }}
              />
            </div>

            <div className="mt-12 border-t border-border pt-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{post.author}</div>
                  <div className="text-sm text-muted-foreground">Software Engineer & Technical Writer</div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
