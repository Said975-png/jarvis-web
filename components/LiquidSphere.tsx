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

    // Liquid sphere animation variables
    let time = 0
    const points = []
    const numPoints = 12

    // Initialize points around a circle
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2
      points.push({
        baseAngle: angle,
        radius: 0,
        x: 0,
        y: 0
      })
    }

    const animate = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const centerX = width / 2
      const centerY = height / 2
      const baseRadius = Math.min(width, height) / 4

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Create animated gradient background
      const bgGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, Math.max(width, height)
      )
      const colorShift = Math.sin(time * 0.5) * 0.1 + 0.9
      bgGradient.addColorStop(0, `rgba(99, 102, 241, ${0.05 * colorShift})`)
      bgGradient.addColorStop(0.5, `rgba(139, 92, 246, ${0.03 * colorShift})`)
      bgGradient.addColorStop(1, `rgba(6, 182, 212, ${0.02 * colorShift})`)
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, width, height)

      // Update points with liquid motion
      points.forEach((point, i) => {
        const waveOffset = Math.sin(time * 2 + i * 0.5) * 20
        const secondaryWave = Math.cos(time * 3 + i * 0.3) * 10
        const tertiaryWave = Math.sin(time * 1.5 + i * 0.8) * 15
        
        point.radius = baseRadius + waveOffset + secondaryWave + tertiaryWave
        
        const dynamicAngle = point.baseAngle + Math.sin(time + i * 0.2) * 0.1
        point.x = centerX + Math.cos(dynamicAngle) * point.radius
        point.y = centerY + Math.sin(dynamicAngle) * point.radius
      })

      // Create liquid sphere shape
      ctx.beginPath()
      if (points.length > 0) {
        // Start from first point
        ctx.moveTo(points[0].x, points[0].y)
        
        // Create smooth curves between points
        for (let i = 0; i < points.length; i++) {
          const currentPoint = points[i]
          const nextPoint = points[(i + 1) % points.length]
          
          // Calculate control points for smooth curves
          const controlDistance = 40
          const angle1 = Math.atan2(nextPoint.y - currentPoint.y, nextPoint.x - currentPoint.x)
          const angle2 = angle1 + Math.PI
          
          const cp1x = currentPoint.x + Math.cos(angle1) * controlDistance
          const cp1y = currentPoint.y + Math.sin(angle1) * controlDistance
          const cp2x = nextPoint.x + Math.cos(angle2) * controlDistance
          const cp2y = nextPoint.y + Math.sin(angle2) * controlDistance
          
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, nextPoint.x, nextPoint.y)
        }
      }
      ctx.closePath()

      // Create liquid gradient
      const liquidGradient = ctx.createRadialGradient(
        centerX - baseRadius * 0.3, 
        centerY - baseRadius * 0.3, 
        0,
        centerX, 
        centerY, 
        baseRadius * 1.5
      )
      
      const hueShift = time * 30
      liquidGradient.addColorStop(0, `hsl(${220 + hueShift}, 80%, 75%)`)
      liquidGradient.addColorStop(0.3, `hsl(${240 + hueShift}, 70%, 65%)`)
      liquidGradient.addColorStop(0.7, `hsl(${260 + hueShift}, 60%, 55%)`)
      liquidGradient.addColorStop(1, `hsl(${280 + hueShift}, 50%, 45%)`)

      // Apply gradient and glow
      ctx.fillStyle = liquidGradient
      ctx.shadowBlur = 30
      ctx.shadowColor = `hsl(${240 + hueShift}, 70%, 60%)`
      ctx.fill()

      // Add inner highlights
      ctx.shadowBlur = 0
      const highlightGradient = ctx.createRadialGradient(
        centerX - baseRadius * 0.4,
        centerY - baseRadius * 0.4,
        0,
        centerX - baseRadius * 0.2,
        centerY - baseRadius * 0.2,
        baseRadius * 0.6
      )
      highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
      highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)')
      highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.fillStyle = highlightGradient
      ctx.fill()

      // Add surface ripples
      for (let i = 0; i < 3; i++) {
        const rippleTime = time * 4 + i * Math.PI * 0.7
        const rippleRadius = (Math.sin(rippleTime) * 0.5 + 0.5) * baseRadius * 0.3
        const rippleOpacity = (Math.sin(rippleTime) * 0.5 + 0.5) * 0.3
        
        ctx.beginPath()
        ctx.arc(
          centerX + Math.cos(rippleTime * 0.3) * baseRadius * 0.2,
          centerY + Math.sin(rippleTime * 0.2) * baseRadius * 0.2,
          rippleRadius,
          0,
          Math.PI * 2
        )
        ctx.strokeStyle = `rgba(255, 255, 255, ${rippleOpacity})`
        ctx.lineWidth = 2
        ctx.stroke()
      }

      time += 0.02
      requestAnimationFrame(animate)
    }

    // Start animation after a short delay
    setTimeout(() => {
      setIsLoaded(true)
      animate()
    }, 300)

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
          transition: 'opacity 0.8s ease'
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

      {/* Floating particles */}
      <div className="floating-particles">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{ 
              animationDelay: `${i * 0.5}s`,
              left: `${20 + i * 10}%`,
              animationDuration: `${4 + i * 0.5}s`
            }} 
          />
        ))}
      </div>

      <style jsx>{`
        .liquid-sphere-container {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .liquid-sphere-canvas {
          border-radius: 20px;
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
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(4px);
        }

        .loading-orb {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899);
          background-size: 200% 200%;
          animation: liquidPulse 2s ease-in-out infinite, gradientShift 3s ease-in-out infinite;
          margin-bottom: 16px;
          position: relative;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
        }

        .orb-inner {
          position: absolute;
          top: 15%;
          left: 20%;
          width: 30%;
          height: 30%;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          filter: blur(1px);
        }

        .liquid-sphere-loading p {
          margin: 0;
          font-size: 14px;
          color: #666666;
          font-weight: 500;
        }

        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          border-radius: 50%;
          animation: float 4s ease-in-out infinite;
          opacity: 0.6;
        }

        @keyframes liquidPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
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

        @keyframes float {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-20px) scale(1);
            opacity: 0;
          }
        }

        /* Dark theme support */
        :global(body.dark-theme) .liquid-sphere-container {
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
        }

        :global(body.dark-theme) .liquid-sphere-loading {
          background: rgba(17, 17, 17, 0.95);
        }

        :global(body.dark-theme) .liquid-sphere-loading p {
          color: #ffffff;
        }

        :global(body.dark-theme) .particle {
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
        }
      `}</style>
    </div>
  )
}
