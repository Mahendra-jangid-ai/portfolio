import { Card, CardContent } from "@/components/ui/card"
import { Code2, Lightbulb, Rocket, Users } from "lucide-react"

export function AboutSection() {
  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code",
    },
    {
      icon: Rocket,
      title: "Fast Delivery",
      description: "Delivering high-quality projects on time",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Always learning and adapting to new technologies",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working effectively in cross-functional teams",
    },
  ]

  return (
    <section id="about" className="container px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">About Me</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Passionate developer with expertise in building modern web applications
          </p>
        </div>

        <div className="mb-16 space-y-6 text-lg leading-relaxed">
          <p className="text-pretty">
            I'm a full-stack developer with over 5 years of experience in creating web applications. I specialize in
            React, Next.js, Node.js, and modern web technologies. My passion lies in transforming ideas into elegant,
            user-friendly solutions.
          </p>
          <p className="text-pretty">
            Throughout my career, I've worked with startups and established companies, helping them build products that
            users love. I'm always eager to take on new challenges and expand my skill set.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.title} className="border-border/50">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
