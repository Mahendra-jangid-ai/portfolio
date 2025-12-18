"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Trash2 } from "lucide-react"

const mockMessages = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    subject: "Project Collaboration",
    message: "Hi, I'd like to discuss a potential collaboration on a web project...",
    date: "2024-01-15",
    read: false,
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@example.com",
    subject: "Job Opportunity",
    message: "We're looking for a talented developer to join our team...",
    date: "2024-01-14",
    read: false,
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.d@example.com",
    subject: "Technical Question",
    message: "I read your blog post about Next.js and had a question...",
    date: "2024-01-12",
    read: true,
  },
]

export function ContactMessages() {
  const [messages, setMessages] = useState(mockMessages)

  const markAsRead = (id: number) => {
    setMessages(messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <p className="text-muted-foreground">View and manage messages from your contact form</p>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className={!message.read ? "border-primary/50" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{message.name}</CardTitle>
                    {!message.read && <Badge variant="default">New</Badge>}
                  </div>
                  <CardDescription>{message.email}</CardDescription>
                </div>
                <span className="text-sm text-muted-foreground">{new Date(message.date).toLocaleDateString()}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 font-semibold">Subject: {message.subject}</div>
                <p className="text-sm text-muted-foreground">{message.message}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => markAsRead(message.id)} disabled={message.read}>
                  <Mail className="mr-2 h-4 w-4" />
                  {message.read ? "Read" : "Mark as Read"}
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
