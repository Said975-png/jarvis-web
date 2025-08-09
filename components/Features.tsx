import { useState, useEffect } from 'react'

export default function Features() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const features = [
    {
      title: "Нейронные сети",
      description: "Используем глубокое машинное обучение для создания интеллектуальных веб-решений",
      type: "neural"
    },
    {
      title: "Квантовые алгоритмы",
      description: "Передовые вычислите��ьные технологии для обработки больших данных",
      type: "quantum"
    },
    {
      title: "Голографический интерфейс",
      description: "Трёхмерные интерактивные элементы будущего уже сегодня",
      type: "hologram"
    },
    {
      title: "AI-Терминал",
      description: "Прямое взаимодействие с искусственным интеллектом через командную строку",
      type: "terminal"
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
                  <div className={`feature-widget widget-${feature.type}`}>
                    <div className="widget-header">
                      <div className="widget-icon">
                        {feature.icon}
                      </div>
                      <div className="widget-badge">{feature.stats}</div>
                    </div>
                    <div className="widget-content">
                      <h3 className="widget-title">{feature.title}</h3>
                      <p className="widget-description">{feature.description}</p>
                    </div>
                    <div className="widget-visual">
                      {feature.type === 'design' && (
                        <div className="design-preview">
                          <div className="preview-window">
                            <div className="window-header">
                              <span></span><span></span><span></span>
                            </div>
                            <div className="window-content">
                              <div className="design-grid">
                                <div className="grid-item"></div>
                                <div className="grid-item"></div>
                                <div className="grid-item large"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {feature.type === 'ai' && (
                        <div className="ai-chat">
                          <div className="chat-message user">Помогите выбрать товар</div>
                          <div className="chat-message ai">
                            <div className="typing-dots">
                              <span></span><span></span><span></span>
                            </div>
                          </div>
                        </div>
                      )}
                      {feature.type === 'personal' && (
                        <div className="personal-stats">
                          <div className="stat-circle">
                            <div className="circle-progress" style={{background: `conic-gradient(var(--color-primary) 75%, var(--color-gray-200) 0)`}}>
                              <span>75%</span>
                            </div>
                          </div>
                          <div className="stat-labels">
                            <div>Персонализация</div>
                          </div>
                        </div>
                      )}
                      {feature.type === 'analytics' && (
                        <div className="analytics-chart">
                          <div className="chart-bars">
                            <div className="bar" style={{height: '60%'}}></div>
                            <div className="bar" style={{height: '80%'}}></div>
                            <div className="bar" style={{height: '45%'}}></div>
                            <div className="bar" style={{height: '90%'}}></div>
                            <div className="bar" style={{height: '70%'}}></div>
                          </div>
                        </div>
                      )}
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
