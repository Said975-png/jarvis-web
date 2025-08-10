import { useEffect, useRef, useState } from 'react'

interface ScrollingSphereProps {
  className?: string
}

export default function ScrollingSphere({ className = '' }: ScrollingSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const [spherePosition, setSpherePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Настройка размера канваса
    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    // Анимационные переменные
    let time = 0
    let targetX = spherePosition.x
    let targetY = spherePosition.y
    let currentX = spherePosition.x
    let currentY = spherePosition.y

    // Функция для отслеживания скролла
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      setScrollPosition(scrollY)
      
      // Определяем текущую секцию
      const sections = document.querySelectorAll('section')
      let newCurrentSection = 0
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          newCurrentSection = index
        }
      })
      
      setCurrentSection(newCurrentSection)
      
      // Вычисляем позицию сферы
      const scrollProgress = scrollY / (documentHeight - windowHeight)
      const sectionProgress = (scrollY % windowHeight) / windowHeight
      
      // Позиционирование по краям экрана в зависимости от секции
      let newTargetX, newTargetY
      
      switch (newCurrentSection % 4) {
        case 0: // Правый край
          newTargetX = window.innerWidth - 150
          newTargetY = 150 + sectionProgress * (windowHeight - 300)
          break
        case 1: // Нижний край
          newTargetX = 150 + sectionProgress * (window.innerWidth - 300)
          newTargetY = windowHeight - 150
          break
        case 2: // Левый край
          newTargetX = 150
          newTargetY = windowHeight - 150 - sectionProgress * (windowHeight - 300)
          break
        case 3: // Верхний край
          newTargetX = window.innerWidth - 150 - sectionProgress * (window.innerWidth - 300)
          newTargetY = 150
          break
        default:
          newTargetX = window.innerWidth - 150
          newTargetY = windowHeight / 2
      }
      
      targetX = newTargetX
      targetY = newTargetY
    }

    // Анимационная функция
    const animate = () => {
      // Плавное движение к цели
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      
      setSpherePosition({ x: currentX, y: currentY })
      
      // Очистка канваса
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Параметры сферы
      const radius = 80 + Math.sin(time * 2) * 15
      const intensity = 0.8 + Math.sin(time * 1.5) * 0.2
      
      // Основная яркая сфера
      const mainGradient = ctx.createRadialGradient(
        currentX - radius * 0.3,
        currentY - radius * 0.3,
        0,
        currentX,
        currentY,
        radius * 2
      )
      
      const hue = (time * 30 + currentSection * 60) % 360
      mainGradient.addColorStop(0, `hsla(${hue}, 100%, 80%, ${intensity})`)
      mainGradient.addColorStop(0.3, `hsla(${hue + 30}, 90%, 70%, ${intensity * 0.8})`)
      mainGradient.addColorStop(0.6, `hsla(${hue + 60}, 80%, 60%, ${intensity * 0.6})`)
      mainGradient.addColorStop(1, `hsla(${hue + 90}, 70%, 50%, 0)`)
      
      // Рисуем основную сферу с искажениями
      ctx.beginPath()
      for (let i = 0; i <= 360; i += 2) {
        const angle = (i * Math.PI) / 180
        const distortion = Math.sin(angle * 6 + time * 4) * 8 + Math.cos(angle * 4 + time * 3) * 6
        const r = radius + distortion
        const x = currentX + Math.cos(angle) * r
        const y = currentY + Math.sin(angle) * r
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      
      // Применяем основной градиент с очень ярким свечением
      ctx.fillStyle = mainGradient
      ctx.shadowBlur = 80
      ctx.shadowColor = `hsl(${hue}, 100%, 70%)`
      ctx.fill()
      
      // Дополнительное свечение
      ctx.shadowBlur = 120
      ctx.shadowColor = `hsl(${hue}, 100%, 60%)`
      ctx.fill()
      
      // Внутреннее яркое ядро
      const coreGradient = ctx.createRadialGradient(
        currentX - radius * 0.2,
        currentY - radius * 0.2,
        0,
        currentX,
        currentY,
        radius * 0.6
      )
      coreGradient.addColorStop(0, `hsla(${hue + 180}, 100%, 90%, 1)`)
      coreGradient.addColorStop(0.5, `hsla(${hue + 120}, 100%, 80%, 0.8)`)
      coreGradient.addColorStop(1, `hsla(${hue + 60}, 100%, 70%, 0)`)
      
      ctx.shadowBlur = 0
      ctx.fillStyle = coreGradient
      ctx.fill()
      
      // Блики
      const highlight1 = ctx.createRadialGradient(
        currentX - radius * 0.4,
        currentY - radius * 0.4,
        0,
        currentX - radius * 0.2,
        currentY - radius * 0.2,
        radius * 0.4
      )
      highlight1.addColorStop(0, 'rgba(255, 255, 255, 1)')
      highlight1.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)')
      highlight1.addColorStop(1, 'rgba(255, 255, 255, 0)')
      
      ctx.fillStyle = highlight1
      ctx.fill()
      
      // Дополнительные энергетические кольца
      for (let ring = 0; ring < 3; ring++) {
        const ringRadius = radius + 20 + ring * 25
        const ringOpacity = (Math.sin(time * 3 + ring * Math.PI * 0.7) + 1) * 0.3
        
        ctx.beginPath()
        ctx.arc(currentX, currentY, ringRadius, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${hue + ring * 40}, 100%, 70%, ${ringOpacity})`
        ctx.lineWidth = 3
        ctx.shadowBlur = 15
        ctx.shadowColor = `hsl(${hue + ring * 40}, 100%, 60%)`
        ctx.stroke()
      }
      
      // Освещение фона вокруг сферы
      const ambientGradient = ctx.createRadialGradient(
        currentX,
        currentY,
        0,
        currentX,
        currentY,
        300
      )
      ambientGradient.addColorStop(0, `hsla(${hue}, 80%, 60%, 0.1)`)
      ambientGradient.addColorStop(0.5, `hsla(${hue + 30}, 70%, 50%, 0.05)`)
      ambientGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      
      ctx.shadowBlur = 0
      ctx.fillStyle = ambientGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      time += 0.04
      requestAnimationFrame(animate)
    }
    
    // Инициализация позиции
    targetX = window.innerWidth - 150
    targetY = 150
    currentX = targetX
    currentY = targetY
    
    // Обработчики событий
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Начальная позиция
    
    // Запуск анимации
    animate()

    return () => {
      window.removeEventListener('resize', updateSize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div ref={containerRef} className={`scrolling-sphere-container ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="scrolling-sphere-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
      
      <style jsx>{`
        .scrolling-sphere-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 10;
        }

        .scrolling-sphere-canvas {
          background: transparent;
        }

        /* Обеспечиваем читаемость текста */
        :global(body) {
          position: relative;
        }
        
        :global(h1, h2, h3, h4, h5, h6) {
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6);
          position: relative;
          z-index: 20;
        }
        
        :global(p, span, button) {
          text-shadow: 0 0 8px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 0, 0, 0.5);
          position: relative;
          z-index: 20;
        }
        
        /* Дополнительная защита для читаемости */
        :global(.hero-content-chatgpt, .pricing-card-chatgpt, .feature-card-chatgpt) {
          backdrop-filter: blur(2px);
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 20px;
          position: relative;
          z-index: 20;
        }
        
        :global(body.dark-theme .hero-content-chatgpt, 
                body.dark-theme .pricing-card-chatgpt, 
                body.dark-theme .feature-card-chatgpt) {
          background: rgba(0, 0, 0, 0.3);
        }
        
        /* Улучш��нная читаемость для темной темы */
        :global(body.dark-theme h1, 
                body.dark-theme h2, 
                body.dark-theme h3, 
                body.dark-theme h4, 
                body.dark-theme h5, 
                body.dark-theme h6) {
          text-shadow: 0 0 15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.7);
        }
        
        :global(body.dark-theme p, 
                body.dark-theme span, 
                body.dark-theme button) {
          text-shadow: 0 0 12px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </div>
  )
}
