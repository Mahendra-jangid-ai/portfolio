// "use client"

// import { useEffect, useRef } from "react"

// export function AnimatedBackground() {
//   const canvasRef = useRef<HTMLCanvasElement>(null)

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return
//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     let raf: number
//     let time = 0

//     const mouse = { x: -9999, y: -9999 }
//     let isHolding = false
//     let overfit = 0 // 0 → 1

//     const symbols = ["AI", "ML", "LLM", "λ", "Σ", "∫", "∇", "∞"]

//     type Node = {
//       x: number
//       y: number
//       vx: number
//       vy: number
//       size: number
//       text: string
//       opacity: number
//       phase: number
//       baseVX: number
//       baseVY: number
//     }

//     const nodes: Node[] = []

//     const resize = () => {
//       canvas.width = window.innerWidth
//       canvas.height = Math.max(
//         document.documentElement.scrollHeight,
//         window.innerHeight
//       )
//     }

//     const init = () => {
//       nodes.length = 0
//       const count = Math.floor((canvas.width * canvas.height) / 38000)

//       for (let i = 0; i < count; i++) {
//         const vx = (Math.random() - 0.5) * 0.25
//         const vy = (Math.random() - 0.5) * 0.25

//         nodes.push({
//           x: Math.random() * canvas.width,
//           y: Math.random() * canvas.height,
//           vx,
//           vy,
//           baseVX: vx,
//           baseVY: vy,
//           size: 14 + Math.random() * 8,
//           text: symbols[Math.floor(Math.random() * symbols.length)],
//           opacity: 0.08 + Math.random() * 0.08,
//           phase: Math.random() * Math.PI * 2,
//         })
//       }
//     }

//     const onMouseMove = (e: MouseEvent) => {
//       mouse.x = e.clientX
//       mouse.y = e.clientY
//     }

//     const onDown = () => (isHolding = true)
//     const onUp = () => (isHolding = false)

//     window.addEventListener("mousemove", onMouseMove)
//     window.addEventListener("mousedown", onDown)
//     window.addEventListener("mouseup", onUp)
//     window.addEventListener("resize", () => {
//       resize()
//       init()
//     })

//     resize()
//     init()

//     const isDark = () =>
//       document.documentElement.classList.contains("dark")

//     const drawConnections = () => {
//       for (let i = 0; i < nodes.length; i++) {
//         for (let j = i + 1; j < nodes.length; j++) {
//           const a = nodes[i]
//           const b = nodes[j]

//           const dx = a.x - b.x
//           const dy = a.y - b.y
//           const dist = Math.hypot(dx, dy)
//           if (dist > 160) continue

//           // Overfitting = tighter & brighter connections
//           const strength = 0.1 + overfit * 0.35

//           ctx.strokeStyle = isDark()
//             ? `rgba(99,102,241,${strength})`
//             : `rgba(59,130,246,${strength * 0.7})`

//           ctx.lineWidth = 1
//           ctx.beginPath()
//           ctx.moveTo(a.x, a.y)
//           ctx.lineTo(b.x, b.y)
//           ctx.stroke()
//         }
//       }
//     }

//     const animate = () => {
//       time++
//       ctx.clearRect(0, 0, canvas.width, canvas.height)

//       // 🔥 Overfit ramp
//       if (isHolding) {
//         overfit = Math.min(1, overfit + 0.015)
//       } else {
//         overfit = Math.max(0, overfit - 0.02)
//       }

//       drawConnections()

//       nodes.forEach((n) => {
//         // Collapse velocity diversity (overfitting)
//         n.vx += (n.baseVX * (1 - overfit) - n.vx) * 0.05
//         n.vy += (n.baseVY * (1 - overfit) - n.vy) * 0.05

//         // Cursor bias when overfitting
//         if (overfit > 0.2) {
//           const dx = mouse.x - n.x
//           const dy = mouse.y - n.y
//           n.vx += dx * overfit * 0.00002
//           n.vy += dy * overfit * 0.00002
//         }

//         n.x += n.vx
//         n.y += n.vy
//         n.phase += 0.01

//         // Wrap
//         if (n.x < -50) n.x = canvas.width + 50
//         if (n.x > canvas.width + 50) n.x = -50
//         if (n.y < -50) n.y = canvas.height + 50
//         if (n.y > canvas.height + 50) n.y = -50

//         const glow =
//           (Math.sin(time * 0.02 + n.phase) + 1) / 2 + overfit * 0.6

//         ctx.save()
//         ctx.translate(n.x, n.y)
//         ctx.font = `${n.size + glow}px "Geist Mono", monospace`
//         ctx.textAlign = "center"
//         ctx.textBaseline = "middle"

//         ctx.shadowBlur = 14 + overfit * 20
//         ctx.shadowColor = isDark()
//           ? "rgba(129,140,248,0.5)"
//           : "rgba(59,130,246,0.35)"

//         ctx.fillStyle = isDark()
//           ? `rgba(199,210,254,${n.opacity + glow * 0.12})`
//           : `rgba(37,99,235,${n.opacity})`

//         ctx.fillText(n.text, 0, 0)
//         ctx.restore()
//       })

//       raf = requestAnimationFrame(animate)
//     }

//     animate()

//     return () => {
//       cancelAnimationFrame(raf)
//       window.removeEventListener("mousemove", onMouseMove)
//       window.removeEventListener("mousedown", onDown)
//       window.removeEventListener("mouseup", onUp)
//     }
//   }, [])

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed inset-0 pointer-events-none"
//       style={{ zIndex: 0 }}
//     />
//   )
// }



"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf: number
    let time = 0

    const mouse = { x: -9999, y: -9999 }
    let isHolding = false
    let overfit = 0

    // 🧠 Attention heads (autonomous)
    const heads = [
      { x: 0, y: 0, vx: 0.12, vy: 0.08 },
      { x: 0, y: 0, vx: -0.1, vy: 0.1 },
    ]

    const symbols = ["AI", "ML", "LLM", "λ", "Σ", "∫", "∇", "∞"]

    type Node = {
      x: number
      y: number
      vx: number
      vy: number
      baseVX: number
      baseVY: number
      size: number
      text: string
      opacity: number
      phase: number
    }

    const nodes: Node[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight
      )
    }

    const init = () => {
      nodes.length = 0
      const count = Math.floor((canvas.width * canvas.height) / 38000)

      for (let i = 0; i < count; i++) {
        const vx = (Math.random() - 0.5) * 0.25
        const vy = (Math.random() - 0.5) * 0.25

        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx,
          vy,
          baseVX: vx,
          baseVY: vy,
          size: 14 + Math.random() * 8,
          text: symbols[Math.floor(Math.random() * symbols.length)],
          opacity: 0.08 + Math.random() * 0.08,
          phase: Math.random() * Math.PI * 2,
        })
      }

      // init heads
      heads.forEach((h) => {
        h.x = Math.random() * canvas.width
        h.y = Math.random() * canvas.height
      })
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const onDown = () => (isHolding = true)
    const onUp = () => (isHolding = false)

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)
    window.addEventListener("resize", () => {
      resize()
      init()
    })

    resize()
    init()

    const isDark = () =>
      document.documentElement.classList.contains("dark")

    // 🔗 Connections influenced by attention heads
    const drawConnections = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]

          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist > 160) continue

          let attentionBoost = 0

          heads.forEach((h) => {
            const mx = (a.x + b.x) / 2
            const my = (a.y + b.y) / 2
            const d = Math.hypot(mx - h.x, my - h.y)
            if (d < 220) {
              attentionBoost += (1 - d / 220) * 0.25
            }
          })

          const strength =
            0.08 + attentionBoost + overfit * 0.35

          ctx.strokeStyle = isDark()
            ? `rgba(99,102,241,${strength})`
            : `rgba(59,130,246,${strength * 0.7})`

          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
    }

    const animate = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Overfitting ramp
      if (isHolding) {
        overfit = Math.min(1, overfit + 0.015)
      } else {
        overfit = Math.max(0, overfit - 0.02)
      }

      // 🧠 Move attention heads
      heads.forEach((h) => {
        h.x += h.vx
        h.y += h.vy

        if (h.x < 0 || h.x > canvas.width) h.vx *= -1
        if (h.y < 0 || h.y > canvas.height) h.vy *= -1
      })

      drawConnections()

      nodes.forEach((n) => {
        // Overfit collapse
        n.vx += (n.baseVX * (1 - overfit) - n.vx) * 0.05
        n.vy += (n.baseVY * (1 - overfit) - n.vy) * 0.05

        // Cursor disturbance
        const dx = n.x - mouse.x
        const dy = n.y - mouse.y
        const d = Math.hypot(dx, dy)
        if (d < 160) {
          const f = (1 - d / 160) * 0.6
          n.vx += (dx / d) * f
          n.vy += (dy / d) * f
        }

        n.x += n.vx
        n.y += n.vy
        n.phase += 0.01

        // Wrap
        if (n.x < -50) n.x = canvas.width + 50
        if (n.x > canvas.width + 50) n.x = -50
        if (n.y < -50) n.y = canvas.height + 50
        if (n.y > canvas.height + 50) n.y = -50

        const glow =
          (Math.sin(time * 0.02 + n.phase) + 1) / 2 +
          overfit * 0.6

        ctx.save()
        ctx.translate(n.x, n.y)
        ctx.font = `${n.size + glow}px "Geist Mono", monospace`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        ctx.shadowBlur = 14 + overfit * 20
        ctx.shadowColor = isDark()
          ? "rgba(129,140,248,0.5)"
          : "rgba(59,130,246,0.35)"

        ctx.fillStyle = isDark()
          ? `rgba(199,210,254,${n.opacity + glow * 0.12})`
          : `rgba(37,99,235,${n.opacity})`

        ctx.fillText(n.text, 0, 0)
        ctx.restore()
      })

      raf = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
