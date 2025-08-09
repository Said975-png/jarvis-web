import { useState, useEffect } from 'react'

export default function GlobalBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="global-background">
      {/* Large floating orbs for entire page */}
      <div 
        className="global-orb global-orb-1" 
        style={{
          transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.06}px)`
        }}
      />
      <div 
        className="global-orb global-orb-2"
        style={{
          transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * 0.08}px)`
        }}
      />
      <div 
        className="global-orb global-orb-3"
        style={{
          transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * -0.04}px)`
        }}
      />
      <div 
        className="global-orb global-orb-4"
        style={{
          transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * 0.12}px)`
        }}
      />
      
      {/* Global grid pattern */}
      <div className="global-grid-pattern" />
    </div>
  )
}
