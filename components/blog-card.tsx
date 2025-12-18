// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Calendar, Clock } from "lucide-react"
// import Link from "next/link"

// interface BlogPost {
//   id: string
//   title: string
//   excerpt: string
//   category: string
//   tags: string[]
//   author: string
//   date: string
//   readTime: string
//   image: string
// }

// interface BlogCardProps {
//   post: BlogPost
// }

// export function BlogCard({ post }: BlogCardProps) {
//   return (
//     <Link href={`/blog/${post.id}`}>
//       <Card className="group h-full border-border/50 transition-all hover:shadow-lg">
//         <CardHeader className="p-0">
//           <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
//             <img
//               src={post.image || "/placeholder.svg"}
//               alt={post.title}
//               className="h-full w-full object-cover transition-transform group-hover:scale-105"
//             />
//           </div>
//         </CardHeader>
//         <CardContent className="p-6">
//           <div className="mb-3 flex items-center gap-2">
//             <Badge variant="secondary" className="text-xs">
//               {post.category}
//             </Badge>
//           </div>
//           <h3 className="mb-2 line-clamp-2 text-xl font-bold">{post.title}</h3>
//           <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
//           <div className="flex flex-wrap gap-2">
//             {post.tags.map((tag) => (
//               <Badge key={tag} variant="outline" className="text-xs">
//                 {tag}
//               </Badge>
//             ))}
//           </div>
//         </CardContent>
//         <CardFooter className="flex items-center justify-between p-6 pt-0 text-xs text-muted-foreground">
//           <div className="flex items-center gap-1">
//             <Calendar className="h-3 w-3" />
//             {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
//           </div>
//           <div className="flex items-center gap-1">
//             <Clock className="h-3 w-3" />
//             {post.readTime}
//           </div>
//         </CardFooter>
//       </Card>
//     </Link>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"

/* ================= TYPES ================= */

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  date: string
  image?: string
}

/* ================= PAGE ================= */

export default function BlogPage() {
  const params = useParams()
  const id = params?.id as string | undefined

  const [posts, setPosts] = useState<BlogPost[]>([])
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  /* ---------- FETCH LIST OR DETAIL ---------- */
  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          // 👉 BLOG DETAIL
          const res = await fetch(`/api/blog/${id}`)
          if (!res.ok) {
            setPost(null)
          } else {
            const data = await res.json()
            setPost(data.post)
          }
        } else {
          // 👉 BLOG LIST
          const res = await fetch("/api/blog")
          const data = await res.json()
          setPosts(data.posts || [])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  /* ================= LOADING ================= */
  if (loading) {
    return <div className="container py-24 text-center">Loading...</div>
  }

  /* ================= BLOG DETAIL ================= */
  if (id) {
    if (!post) {
      return (
        <div className="container py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/blog">← Back to Blog</Link>
          </Button>
        </div>
      )
    }

    return (
      <article className="container max-w-3xl py-24">
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>

        <p className="mb-6 text-sm text-muted-foreground">
          {new Date(post.date).toLocaleDateString()}
        </p>

        <div className="prose dark:prose-invert">
          {post.content}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-muted px-2 py-1 text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>
    )
  }

  /* ================= BLOG LIST ================= */
  return (
    <section className="container py-24">
      <h1 className="mb-10 text-center text-4xl font-bold">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No blog posts found.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post._id}`}>
              <Card className="group h-full border-border/50 transition hover:shadow-lg">
                <CardHeader className="p-0">
                  <div className="aspect-video overflow-hidden rounded-t-lg bg-muted">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {post.category}
                  </Badge>

                  <h3 className="mb-2 line-clamp-2 text-xl font-bold">
                    {post.title}
                  </h3>

                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                </CardContent>

                <CardFooter className="flex justify-between px-6 pb-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    5 min
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
