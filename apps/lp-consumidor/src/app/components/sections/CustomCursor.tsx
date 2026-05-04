'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const dotX = useSpring(mouseX, { stiffness: 500, damping: 35, mass: 0.3 })
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 35, mass: 0.3 })

  const ringX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.6 })
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.6 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onEnterInteractive = () => setHovering(true)
    const onLeaveInteractive = () => setHovering(false)

    window.addEventListener('mousemove', onMove)

    const updateInteractables = () => {
      document
        .querySelectorAll('a, button, [role="button"], input, textarea')
        .forEach((el) => {
          el.addEventListener('mouseenter', onEnterInteractive)
          el.addEventListener('mouseleave', onLeaveInteractive)
        })
    }

    updateInteractables()
    const observer = new MutationObserver(updateInteractables)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [mouseX, mouseY, visible])

  if (!visible) return null

  return (
    <div className="hidden lg:block pointer-events-none">
      {/* Dot */}
      <motion.div
        className="fixed z-[9999] rounded-full bg-[#4CAF82]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovering ? 12 : 6,
          height: hovering ? 12 : 6,
          opacity: 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring */}
      <motion.div
        className="fixed z-[9998] rounded-full border border-[#4CAF82]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovering ? 44 : 32,
          height: hovering ? 44 : 32,
          opacity: hovering ? 0.6 : 0.25,
          borderColor: hovering ? '#4CAF82' : 'rgba(76,175,130,0.4)',
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}
