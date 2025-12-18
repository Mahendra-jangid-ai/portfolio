"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import type { Skill } from "@/lib/models"

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch("/api/skills")
        const data = await response.json()
        setSkills(data.skills || [])
      } catch (error) {
        console.error("[v0] Error fetching skills:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [])

  const skillCategories = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill.name)
      return acc
    },
    {} as Record<string, string[]>,
  )

  const categoryList = Object.entries(skillCategories).map(([category, skillNames]) => ({
    category,
    skills: skillNames,
  }))

  return (
    <section id="skills" className="container px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Skills & Expertise</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Technologies and tools I work with to build amazing products
          </p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">Loading skills...</div>
        ) : categoryList.length === 0 ? (
          <div className="text-center text-muted-foreground">No skills found. Add some from the admin dashboard.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {categoryList.map((item) => (
              <Card key={item.category} className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl">{item.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
