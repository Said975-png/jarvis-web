import { useState, useEffect } from 'react'

export default function Features() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const features = [
    {
      title: "Нейронные сети",
      description: "Используем глубок��е машинное обучение для создания интеллектуальных веб-решений",
      type: "neural"
    },
    {
      title: "Квантовые алгоритмы",
      description: "Передовые вычислительные технологии для обработки больших данных",
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
                  <div className={`ai-feature-card ai-${feature.type}`}>
                    <div className="ai-background">
                      {feature.type === 'neural' && (
                        <div className="neural-network">
                          <svg className="neural-svg" viewBox="0 0 400 300">
                            <defs>
                              <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                                <feMerge>
                                  <feMergeNode in="coloredBlur"/>
                                  <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                              </filter>
                            </defs>
                            {Array.from({length: 12}, (_, i) => (
                              <circle
                                key={i}
                                cx={50 + (i % 4) * 100}
                                cy={50 + Math.floor(i / 4) * 100}
                                r="8"
                                className="neural-node"
                                style={{animationDelay: `${i * 0.2}s`}}
                              />
                            ))}
                            {Array.from({length: 20}, (_, i) => (
                              <line
                                key={i}
                                x1={50 + (i % 4) * 100}
                                y1={50 + Math.floor(i / 4) * 100}
                                x2={150 + ((i + 1) % 4) * 100}
                                y2={150 + Math.floor((i + 1) / 4) * 100}
                                className="neural-connection"
                                style={{animationDelay: `${i * 0.1}s`}}
                              />
                            ))}
                          </svg>
                        </div>
                      )}
                      {feature.type === 'quantum' && (
                        <div className="quantum-field">
                          <div className="quantum-particles">
                            {Array.from({length: 15}, (_, i) => (
                              <div
                                key={i}
                                className="quantum-particle"
                                style={{
                                  animationDelay: `${i * 0.3}s`,
                                  left: `${Math.random() * 100}%`,
                                  top: `${Math.random() * 100}%`
                                }}
                              ></div>
                            ))}
                          </div>
                          <div className="quantum-waves">
                            <div className="wave wave-1"></div>
                            <div className="wave wave-2"></div>
                            <div className="wave wave-3"></div>
                          </div>
                        </div>
                      )}
                      {feature.type === 'hologram' && (
                        <div className="hologram-display">
                          <div className="hologram-cube">
                            <div className="cube-face front"></div>
                            <div className="cube-face back"></div>
                            <div className="cube-face right"></div>
                            <div className="cube-face left"></div>
                            <div className="cube-face top"></div>
                            <div className="cube-face bottom"></div>
                          </div>
                          <div className="hologram-scan"></div>
                        </div>
                      )}
                      {feature.type === 'terminal' && (
                        <div className="ai-terminal">
                          <div className="terminal-header">
                            <span className="terminal-dot red"></span>
                            <span className="terminal-dot yellow"></span>
                            <span className="terminal-dot green"></span>
                            <span className="terminal-title">JARVIS AI TERMINAL</span>
                          </div>
                          <div className="terminal-body">
                            <div className="terminal-line">
                              <span className="prompt">jarvis@ai:~$</span>
                              <span className="command">initialize neural_network</span>
                            </div>
                            <div className="terminal-line">
                              <span className="response">Loading neural pathways...</span>
                            </div>
                            <div className="terminal-line">
                              <span className="response success">✓ AI System Online</span>
                            </div>
                            <div className="terminal-line active">
                              <span className="prompt">jarvis@ai:~$</span>
                              <span className="cursor">_</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="ai-content">
                      <div className="ai-title-wrapper">
                        <h3 className="ai-title">{feature.title}</h3>
                        <div className="ai-status">ONLINE</div>
                      </div>
                      <p className="ai-description">{feature.description}</p>
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
