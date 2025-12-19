// import type React from "react"
// import type { Metadata } from "next"
// import { Geist, Geist_Mono } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
// import "./globals.css"
// import { AnimatedBackground } from "@/components/ui/animated-background"

// const _geist = Geist({ subsets: ["latin"] })
// const _geistMono = Geist_Mono({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Mahendara Jangid - AI ML Engineer Portfolio",
//   description:
//     "Portfolio of Mahendara Jangid - AI ML Engineer & Software Engineer specializing in React, Next.js, and modern web technologies",
//   // generator: "v0.app",
//   // icons: {
//   //   icon: [
//   //     {
//   //       url: "/icon-light-32x32.png",
//   //       media: "(prefers-color-scheme: light)",
//   //     },
//   //     {
//   //       url: "/icon-dark-32x32.png",
//   //       media: "(prefers-color-scheme: dark)",
//   //     },
//   //     {
//   //       url: "/icon.svg",
//   //       type: "image/svg+xml",
//   //     },
//   //   ],
//   //   apple: "/apple-icon.png",
//   // },
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <body className={`font-sans antialiased`}>
//         <div className="m-auto container">
//         {<  AnimatedBackground />}
//         <main className="relative z-10">
//           {children}
//         </main>
//         </div>
//         <Analytics />
//       </body>
//     </html>
//   )
// }


import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AnimatedBackground } from "@/components/animated-background"
// import { FloatingTechStack } from "@/components/floating-tech-stack"
import { CursorTrail } from "@/components/curser-trail"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mahendra Jangid - AI ML Engineer Portfolio",
  description:
    "Portfolio of Mahendra Jangid - AI ML Engineer & Software Engineer specializing in React, Next.js, and modern web technologies",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <AnimatedBackground />
        {/* <FloatingTechStack /> */}
        <CursorTrail />
        {children}
        <Analytics />
      </body>
    </html>
  )
}