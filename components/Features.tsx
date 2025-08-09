import { useState, useEffect } from 'react'

export default function Features() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const features = [
    {
      title: "Стильные AI-дизайны",
      description: "Создаем уникальные и современные дизайны сайтов, используя передовые технологии искусственного интеллекта для максимального пользовательского опыта",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
          <circle cx="12" cy="12" r="3" fill="white"/>
        </svg>
      )
    },
    {
      title: "ДЖАРВИС ИИ-Ассистент",
      description: "Наш умный ассистент помогает клиентам выбрать подходящий товар, отвечает на вопросы и общается как настоящий человек, обеспечивая персональный подход к каждому",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="3" fill="currentColor"/>
          <path d="M12 11C13.1 11 14 11.9 14 13V17H10V13C10 11.9 10.9 11 12 11Z" fill="currentColor"/>
          <path d="M3 21V19C3 16.79 4.79 15 7 15H17C19.21 15 21 16.79 21 19V21" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: "Персонализированное общение",
      description: "ДЖАРВИС анализирует поведение пользователей и адаптирует общение под каждого клиента, предлагая релевантные решения и создавая комфортную атмосферу взаимодействия",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H6L10 22L14 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
          <circle cx="8" cy="9" r="1.5" fill="white"/>
          <circle cx="12" cy="9" r="1.5" fill="white"/>
          <circle cx="16" cy="9" r="1.5" fill="white"/>
        </svg>
      )
    },
    {
      title: "Умная аналитика",
      description: "Встроенная система аналитики отслеживает поведение пользователей и предос��авляет детальные отчеты для оптимизации конверсии и улучшения пользовательского опыта",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M3 17V7C3 5.9 3.9 5 5 5H19C20.1 5 21 5.9 21 7V17C21 18.1 20.1 19 19 19H5C3.9 19 3 18.1 3 17Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M7 13L10 10L13 13L17 9" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="7" cy="13" r="1" fill="currentColor"/>
          <circle cx="10" cy="10" r="1" fill="currentColor"/>
          <circle cx="13" cy="13" r="1" fill="currentColor"/>
          <circle cx="17" cy="9" r="1" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: "24/7 Поддержка",
      description: "ДЖАРВИС работает круглосуточно, обеспечивая непрерывную поддержку клиентов и мгновенные ответы на любые вопросы в любое время дня и ночи",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
        </svg>
      )
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [features.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length)
  }

  return (
    <section className="features-section">
      {/* Background Decorative Elements */}
      <div className="bg-decoration">
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
        <div className="grid-pattern" />
      </div>

      <div className="features-container">
        <div className="features-header">
          <div className="section-number">03</div>
          <h2 className="features-title">Наши преимущества</h2>
          <p className="features-subtitle">
            Откройте для себя инновационные возможности наших AI-решений
          </p>
        </div>

        <div className="features-slider">
          <div className="slider-container">
            <div 
              className="slides-wrapper"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="feature-slide">
                  <div className="feature-card-modern">
                    <div className="feature-icon-wrapper">
                      <div className="feature-icon-modern">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="feature-content">
                      <h3 className="feature-title-modern">{feature.title}</h3>
                      <p className="feature-description-modern">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="slider-controls">
            <button 
              className="slider-arrow slider-prev" 
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="slider-dots">
              {features.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button 
              className="slider-arrow slider-next" 
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
