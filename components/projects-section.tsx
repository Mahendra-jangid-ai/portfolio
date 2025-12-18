"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { useState, useEffect } from "react"
import type { Project } from "@/lib/models"

export function ProjectsSection() {
  const [filter, setFilter] = useState("All")
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects")
        const data = await response.json()
        setProjects(data.projects || [])
      } catch (error) {
        console.error("[v0] Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]
  const filteredProjects = filter === "All" ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="container px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Featured Projects</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A selection of my recent work and personal projects
          </p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">Loading projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center text-muted-foreground">No projects found. Add some from the admin dashboard.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project._id} className="flex flex-col border-border/50 transition-shadow hover:shadow-lg">
                <CardHeader className="p-0">
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-6">
                  <CardTitle className="mb-2 text-xl">{project.title}</CardTitle>
                  <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="gap-2 p-6 pt-0">
                  {project.github && (
                    <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button asChild size="sm" className="flex-1">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
