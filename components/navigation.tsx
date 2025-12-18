// "use client"

// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Menu, Moon, Sun, X } from "lucide-react"
// import { useState, useEffect } from "react"

// export function Navigation() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [isDark, setIsDark] = useState(false)

//   useEffect(() => {
//     const isDarkMode = document.documentElement.classList.contains("dark")
//     setIsDark(isDarkMode)
//   }, [])

//   const toggleTheme = () => {
//     const newMode = !isDark
//     setIsDark(newMode)
//     document.documentElement.classList.toggle("dark", newMode)
//   }

//   const navLinks = [
//     { href: "#home", label: "Home" },
//     { href: "#about", label: "About" },
//     { href: "#skills", label: "Skills" },
//     { href: "#projects", label: "Projects" },
//     { href: "/blog", label: "Blog" },
//     { href: "#contact", label: "Contact" },
//   ]

//   return (
//     <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center justify-between px-4">
//         <Link href="/" className="text-xl font-bold">
//           Portfolio
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden items-center gap-6 md:flex">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//             >
//               {link.label}
//             </Link>
//           ))}
//           <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
//             {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//           </Button>
//         </div>

//         {/* Mobile Navigation */}
//         <div className="flex items-center gap-2 md:hidden">
//           <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
//             {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//           </Button>
//           <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
//             {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </Button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="border-t border-border/40 bg-background md:hidden">
//           <div className="container flex flex-col gap-4 px-4 py-6">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   )
// }


"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Moon, Sun, X } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const newMode = !isDark
    setIsDark(newMode)
    document.documentElement.classList.toggle("dark", newMode)
  }

  const navLinks = [
    { href: isHome ? "#home" : "/#home", label: "Home" },
    { href: isHome ? "#about" : "/#about", label: "About" },
    { href: isHome ? "#skills" : "/#skills", label: "Skills" },
    { href: isHome ? "#projects" : "/#projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: isHome ? "#contact" : "/#contact", label: "Contact" },
  ]

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <div className="container flex flex-col gap-4 px-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
