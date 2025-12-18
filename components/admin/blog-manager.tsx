// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Plus, Pencil, Trash2 } from "lucide-react"

// const mockPosts = [
//   { id: 1, title: "Getting Started with Next.js 15", status: "Published", date: "2024-01-15" },
//   { id: 2, title: "Building Scalable APIs", status: "Published", date: "2024-01-10" },
//   { id: 3, title: "TypeScript Advanced Types", status: "Draft", date: "2024-01-05" },
// ]

// export function BlogManager() {
//   const [posts] = useState(mockPosts)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold">Blog Posts</h2>
//           <p className="text-muted-foreground">Manage your blog content</p>
//         </div>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="mr-2 h-4 w-4" />
//               New Post
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="max-w-2xl">
//             <DialogHeader>
//               <DialogTitle>Create New Blog Post</DialogTitle>
//               <DialogDescription>Write a new article for your blog</DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="post-title">Title</Label>
//                 <Input id="post-title" placeholder="Post title" />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="excerpt">Excerpt</Label>
//                 <Textarea id="excerpt" placeholder="Brief summary" rows={2} />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="content">Content</Label>
//                 <Textarea id="content" placeholder="Write your post content..." rows={8} />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="post-category">Category</Label>
//                 <Input id="post-category" placeholder="e.g., Web Development" />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="post-tags">Tags (comma-separated)</Label>
//                 <Input id="post-tags" placeholder="Next.js, React, JavaScript" />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
//                 Save as Draft
//               </Button>
//               <Button onClick={() => setIsDialogOpen(false)}>Publish</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="space-y-4">
//         {posts.map((post) => (
//           <Card key={post.id}>
//             <CardHeader>
//               <div className="flex items-start justify-between">
//                 <div>
//                   <CardTitle className="text-lg">{post.title}</CardTitle>
//                   <CardDescription>{new Date(post.date).toLocaleDateString()}</CardDescription>
//                 </div>
//                 <span
//                   className={`rounded-full px-2 py-1 text-xs font-medium ${
//                     post.status === "Published"
//                       ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
//                       : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
//                   }`}
//                 >
//                   {post.status}
//                 </span>
//               </div>
//             </CardHeader>
//             <CardFooter className="gap-2">
//               <Button variant="outline" size="sm">
//                 <Pencil className="mr-2 h-4 w-4" />
//                 Edit
//               </Button>
//               <Button variant="outline" size="sm">
//                 <Trash2 className="mr-2 h-4 w-4" />
//                 Delete
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }



"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"

type BlogPost = {
  _id: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  status: "Published" | "Draft"
  date: string
}

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // form state
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")

  // 🔹 fetch posts
  async function fetchPosts() {
    const res = await fetch("/api/blog")
    const data = await res.json()
    setPosts(data.posts || [])
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // 🔹 create post
  async function createPost(status: "Published" | "Draft") {
    if (!title || !content) return

    setLoading(true)

    await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        excerpt,
        content,
        category,
        tags: tags.split(",").map((t) => t.trim()),
        status,
        date: new Date(),
      }),
    })

    // reset
    setTitle("")
    setExcerpt("")
    setContent("")
    setCategory("")
    setTags("")
    setOpen(false)
    setLoading(false)
    fetchPosts()
  }

  // 🔹 delete post
  async function deletePost(id: string) {
    await fetch(`/api/blog/${id}`, { method: "DELETE" })
    fetchPosts()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Blog Posts</h2>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>

          {/* Create Post Dialog */}
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Blog Post</DialogTitle>
              <DialogDescription>
                Write a new article for your blog
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div>
                <Label>Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div>
                <Label>Excerpt</Label>
                <Textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>

              <div>
                <Label>Content</Label>
                <Textarea
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div>
                <Label>Category</Label>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div>
                <Label>Tags (comma separated)</Label>
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => createPost("Draft")}
                disabled={loading}
              >
                Save as Draft
              </Button>
              <Button
                onClick={() => createPost("Published")}
                disabled={loading}
              >
                Publish
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post._id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription>
                    {new Date(post.date).toLocaleDateString()}
                  </CardDescription>
                </div>

                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    post.status === "Published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {post.status}
                </span>
              </div>
            </CardHeader>

            <CardFooter className="gap-2">
              <Button variant="outline" size="sm">
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => deletePost(post._id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
