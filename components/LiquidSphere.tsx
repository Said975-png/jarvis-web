import { useEffect, useRef, useState } from 'react'

interface LiquidSphereProps {
  className?: string
}

export default function LiquidSphere({ className = '' }: LiquidSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    // Animation variables
    let time = 0

    const animate = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const centerX = width / 2
      const centerY = height / 2
      const sphereRadius = Math.min(width, height) / 5

      // Clear canvas with transparent background
      ctx.clearRect(0, 0, width, height)

      // Create main liquid sphere (more circular)
      const sphereWave = Math.sin(time * 2) * 8 + Math.cos(time * 1.5) * 5
      const actualRadius = sphereRadius + sphereWave

      // Draw main sphere with liquid gradient
      const sphereGradient = ctx.createRadialGradient(
        centerX - sphereRadius * 0.3, 
        centerY - sphereRadius * 0.3, 
        0,
        centerX, 
        centerY, 
        actualRadius * 1.2
      )
      
      const hueShift = time * 20
      sphereGradient.addColorStop(0, `hsl(${220 + hueShift}, 85%, 75%)`)
      sphereGradient.addColorStop(0.4, `hsl(${240 + hueShift}, 75%, 65%)`)
      sphereGradient.addColorStop(0.8, `hsl(${260 + hueShift}, 65%, 55%)`)
      sphereGradient.addColorStop(1, `hsl(${280 + hueShift}, 55%, 45%)`)

      // Draw sphere with subtle distortion for liquid effect
      ctx.beginPath()
      for (let i = 0; i <= 360; i += 5) {
        const angle = (i * Math.PI) / 180
        const distortion = Math.sin(angle * 4 + time * 3) * 3 + Math.cos(angle * 6 + time * 2) * 2
        const radius = actualRadius + distortion
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()

      // Apply gradient and glow
      ctx.fillStyle = sphereGradient
      ctx.shadowBlur = 25
      ctx.shadowColor = `hsl(${240 + hueShift}, 70%, 60%)`
      ctx.fill()

      // Add highlight on sphere
      ctx.shadowBlur = 0
      const highlightGradient = ctx.createRadialGradient(
        centerX - sphereRadius * 0.4,
        centerY - sphereRadius * 0.4,
        0,
        centerX - sphereRadius * 0.2,
        centerY - sphereRadius * 0.2,
        sphereRadius * 0.8
      )
      highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
      highlightGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.4)')
      highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.fillStyle = highlightGradient
      ctx.fill()

      // Update and draw droplets
      droplets.forEach((droplet, index) => {
        // Update droplet position and size
        const cyclePhase = Math.sin(time * droplet.speed + droplet.phase)
        
        if (cyclePhase > 0) {
          // Droplet moving out
          droplet.distance = (cyclePhase) * droplet.maxDistance
          droplet.size = Math.min(cyclePhase * 8, 8) * (0.8 + Math.random() * 0.4)
          droplet.opacity = Math.min(cyclePhase * 2, 1)
        } else {
          // Droplet moving back in
          droplet.distance = (-cyclePhase) * droplet.maxDistance
          droplet.size = Math.min((-cyclePhase) * 6, 6) * (0.8 + Math.random() * 0.4)
          droplet.opacity = Math.min((-cyclePhase) * 2, 1)
        }

        // Calculate droplet position
        const dropletX = centerX + Math.cos(droplet.angle + time * 0.5) * (actualRadius + droplet.distance)
        const dropletY = centerY + Math.sin(droplet.angle + time * 0.5) * (actualRadius + droplet.distance)

        // Draw droplet
        if (droplet.size > 0 && droplet.opacity > 0) {
          const dropletGradient = ctx.createRadialGradient(
            dropletX - droplet.size * 0.3,
            dropletY - droplet.size * 0.3,
            0,
            dropletX,
            dropletY,
            droplet.size
          )
          
          dropletGradient.addColorStop(0, `hsla(${220 + hueShift}, 85%, 75%, ${droplet.opacity})`)
          dropletGradient.addColorStop(0.6, `hsla(${240 + hueShift}, 75%, 65%, ${droplet.opacity * 0.8})`)
          dropletGradient.addColorStop(1, `hsla(${260 + hueShift}, 65%, 55%, ${droplet.opacity * 0.3})`)

          ctx.beginPath()
          ctx.arc(dropletX, dropletY, droplet.size, 0, Math.PI * 2)
          ctx.fillStyle = dropletGradient
          ctx.shadowBlur = 8
          ctx.shadowColor = `hsla(${240 + hueShift}, 70%, 60%, ${droplet.opacity * 0.5})`
          ctx.fill()

          // Add highlight to droplet
          ctx.shadowBlur = 0
          const dropletHighlight = ctx.createRadialGradient(
            dropletX - droplet.size * 0.4,
            dropletY - droplet.size * 0.4,
            0,
            dropletX - droplet.size * 0.2,
            dropletY - droplet.size * 0.2,
            droplet.size * 0.6
          )
          dropletHighlight.addColorStop(0, `rgba(255, 255, 255, ${droplet.opacity * 0.8})`)
          dropletHighlight.addColorStop(1, 'rgba(255, 255, 255, 0)')
          
          ctx.fillStyle = dropletHighlight
          ctx.fill()
        }

        // Draw connection trail from sphere to droplet
        if (droplet.distance > 5 && droplet.opacity > 0.3) {
          const connectionStartX = centerX + Math.cos(droplet.angle + time * 0.5) * actualRadius
          const connectionStartY = centerY + Math.sin(droplet.angle + time * 0.5) * actualRadius
          
          const trailGradient = ctx.createLinearGradient(
            connectionStartX, connectionStartY,
            dropletX, dropletY
          )
          trailGradient.addColorStop(0, `hsla(${240 + hueShift}, 70%, 60%, ${droplet.opacity * 0.6})`)
          trailGradient.addColorStop(0.5, `hsla(${250 + hueShift}, 65%, 55%, ${droplet.opacity * 0.3})`)
          trailGradient.addColorStop(1, `hsla(${260 + hueShift}, 60%, 50%, 0)`)

          ctx.beginPath()
          ctx.moveTo(connectionStartX, connectionStartY)
          ctx.lineTo(dropletX, dropletY)
          ctx.strokeStyle = trailGradient
          ctx.lineWidth = Math.max(1, droplet.size * 0.3)
          ctx.lineCap = 'round'
          ctx.shadowBlur = 4
          ctx.shadowColor = `hsla(${240 + hueShift}, 70%, 60%, ${droplet.opacity * 0.3})`
          ctx.stroke()
        }
      })

      // Reset shadow for next frame
      ctx.shadowBlur = 0

      time += 0.03
      requestAnimationFrame(animate)
    }

    // Start animation after a short delay
    setTimeout(() => {
      setIsLoaded(true)
      animate()
    }, 200)

    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  return (
    <div className={`liquid-sphere-container ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="liquid-sphere-canvas"
        style={{ 
          width: '100%', 
          height: '100%',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1s ease'
        }} 
      />
      
      {!isLoaded && (
        <div className="liquid-sphere-loading">
          <div className="loading-orb">
            <div className="orb-inner"></div>
          </div>
          <p>Создание жидкой сферы...</p>
        </div>
      )}

      <style jsx>{`
        .liquid-sphere-container {
          position: relative;
          width: 100%;
          height: 100%;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .liquid-sphere-canvas {
          background: transparent;
        }

        .liquid-sphere-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: transparent;
        }

        .loading-orb {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899);
          background-size: 200% 200%;
          animation: liquidPulse 2s ease-in-out infinite, gradientShift 3s ease-in-out infinite;
          margin-bottom: 12px;
          position: relative;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.6);
        }

        .orb-inner {
          position: absolute;
          top: 20%;
          left: 25%;
          width: 25%;
          height: 25%;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          filter: blur(1px);
        }

        .liquid-sphere-loading p {
          margin: 0;
          font-size: 14px;
          color: #666666;
          font-weight: 500;
          text-align: center;
        }

        @keyframes liquidPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Dark theme support */
        :global(body.dark-theme) .liquid-sphere-loading p {
          color: #ffffff;
        }
      `}</style>
    </div>
  )
}
