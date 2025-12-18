import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section id="home" className="container flex min-h-screen items-center px-4 pt-16">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8 inline-block animate-fade-in rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
          Welcome to my portfolio
        </div>

        <h1 className="mb-6 animate-fade-in text-balance text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          Hi, I'm <span className="text-primary">Mahendra Jangid</span>
        </h1>

        <p
          className="mb-8 animate-fade-in text-balance text-xl text-muted-foreground sm:text-2xl"
          style={{ animationDelay: "0.1s" }}
        >
          AI ML Engineer
        </p>

        <p
          className="mx-auto mb-12 max-w-2xl animate-fade-in text-pretty text-lg leading-relaxed text-muted-foreground"
          style={{ animationDelay: "0.2s" }}
        >
          I build exceptional digital experiences with modern technologies. Passionate about creating scalable
          applications and solving complex problems.
        </p>

        <div
          className="mb-12 flex flex-wrap items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <Button asChild size="lg">
            <Link href="#projects">
              View My Work <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#contact">Contact Me</Link>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button asChild variant="ghost" size="icon">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <a href="mailto:john@example.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
