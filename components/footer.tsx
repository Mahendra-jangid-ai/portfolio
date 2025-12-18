import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/50">
      <div className="container px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex justify-center gap-4">
            <a
              href="https://mahendra-jangid-ai.github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-background transition-colors hover:bg-accent"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mahendra-jangid-2969412a2/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-background transition-colors hover:bg-accent"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-background transition-colors hover:bg-accent"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="mailto:mahendra.jangid.official.com"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-background transition-colors hover:bg-accent"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Mahendra Jangid. All rights reserved.</p>
            <div className="mt-2 flex justify-center gap-4">
              <Link href="/blog" className="hover:text-foreground">
                Blog
              </Link>
              <Link href="/admin" className="hover:text-foreground">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
