export interface Project {
  _id?: string
  title: string
  description: string
  image: string
  tags: string[]
  category: string
  github?: string
  demo?: string
  createdAt: Date
  updatedAt: Date
}

export interface BlogPost {
  _id?: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: Date
  category: string
  readTime: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Skill {
  _id?: string
  name: string
  category: string
  level: number
  icon?: string
  createdAt: Date
  updatedAt: Date
}

export interface ContactMessage {
  _id?: string
  name: string
  email: string
  subject: string
  message: string
  status: "unread" | "read" | "archived"
  createdAt: Date
  updatedAt: Date
}
