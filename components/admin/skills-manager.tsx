// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Badge } from "@/components/ui/badge"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Plus, X } from "lucide-react"

// const mockSkills = [
//   { category: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
//   { category: "Backend", skills: ["Node.js", "Express", "MongoDB", "PostgreSQL"] },
//   { category: "Tools", skills: ["Git", "Docker", "AWS", "Vercel"] },
// ]

// export function SkillsManager() {
//   const [skillsData] = useState(mockSkills)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold">Skills</h2>
//           <p className="text-muted-foreground">Manage your skills and expertise</p>
//         </div>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="mr-2 h-4 w-4" />
//               Add Skill
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Add New Skill</DialogTitle>
//               <DialogDescription>Add a skill to your portfolio</DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="skill-category">Category</Label>
//                 <Input id="skill-category" placeholder="e.g., Frontend" />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="skill-name">Skill Name</Label>
//                 <Input id="skill-name" placeholder="e.g., React" />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={() => setIsDialogOpen(false)}>Add Skill</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2">
//         {skillsData.map((category) => (
//           <Card key={category.category}>
//             <CardHeader>
//               <CardTitle>{category.category}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-wrap gap-2">
//                 {category.skills.map((skill) => (
//                   <Badge key={skill} variant="secondary" className="gap-1">
//                     {skill}
//                     <button className="ml-1 hover:text-destructive">
//                       <X className="h-3 w-3" />
//                     </button>
//                   </Badge>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"

type Skill = {
  _id: string
  name: string
  category: string
}

export function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  async function fetchSkills() {
    const res = await fetch("/api/skills")
    const data = await res.json()
    setSkills(data.skills || [])
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  async function addSkill() {
    if (!category || !name) return

    setLoading(true)
    await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, name }),
    })

    setCategory("")
    setName("")
    setOpen(false)
    setLoading(false)
    fetchSkills()
  }

  const grouped = skills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Skills</h2>
          <p className="text-muted-foreground">
            Manage your skills and expertise
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Skill</DialogTitle>
              <DialogDescription>
                Add a new skill to your portfolio
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div>
                <Label>Category</Label>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Frontend / Backend / Tools"
                />
              </div>
              <div>
                <Label>Skill Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="React"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addSkill} disabled={loading}>
                {loading ? "Adding..." : "Add Skill"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(grouped).map(([category, list]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {list.map((skill) => (
                  <Badge key={skill._id} variant="secondary">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
