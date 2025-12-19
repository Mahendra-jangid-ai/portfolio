"use client"

import { useEffect, useRef, useState } from "react"

export function CursorTrail() {
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const frame = useRef(0)

  const cursorRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY

      const el = e.target as HTMLElement
      setHovering(!!el.closest("a, button"))
    }

    window.addEventListener("mousemove", onMove)

    let raf: number
    const animate = () => {
      frame.current += 0.012

      // Smooth follow
      current.current.x += (target.current.x - current.current.x) * 0.18
      current.current.y += (target.current.y - current.current.y) * 0.18

      // Soft breathing
      const breathe = Math.sin(frame.current) * 0.5 + 0.5
      const scale = 1 + breathe * 0.12

      const opacity = hovering
        ? 0.12
        : 0.22 + breathe * 0.06 // 👈 clearly visible now

      if (cursorRef.current) {
        cursorRef.current.style.transform = `
          translate(${current.current.x}px, ${current.current.y}px)
          translate(-50%, -50%)
          scale(${scale})
        `
        cursorRef.current.style.opacity = opacity.toString()
      }

      raf = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
    }
  }, [hovering])

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999]"
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(150,170,255,0.55), rgba(150,170,255,0.3), rgba(150,170,255,0.12), transparent 70%)",
          filter: "blur(2px)", // 👈 less blur, more presence
        }}
      />
    </div>
  )
}
