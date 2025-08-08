import { useState, useEffect } from 'react'

export default function Hero() {
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
    <section className="hero-section">
      {/* Background Decorative Elements */}
      <div className="bg-decoration">
        <div 
          className="floating-orb orb-1" 
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
          }}
        />
        <div 
          className="floating-orb orb-2"
          style={{
            transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * 0.08}px)`
          }}
        />
        <div className="grid-pattern" />
      </div>

      <div className="hero-container">
        {/* Navigation */}
        <nav className="hero-nav">
          <div className="logo">
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text">JARVIS</span>
          </div>
          <div className="nav-links">
            <a href="#services">Услуги</a>
            <a href="#portfolio">Портфолио</a>
            <a href="#contact">Контакты</a>
          </div>
        </nav>

        {/* Main Content */}
        <div className="hero-main">
          <div className="hero-content">
            <div className="hero-badge">
              <div className="badge-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Передовые AI-технологии
            </div>

            <h1 className="hero-title">
              Создаем <span className="title-highlight">инновационные</span><br />
              веб-решения будущего
            </h1>

            <p className="hero-description">
              Мы объединяем креативность дизайна с мощью искусственного интеллекта,
              чтобы создавать веб-сайты и приложения, которые не просто впечатляют,
              а революционизируют пользовательский опыт.
            </p>

            <div className="hero-features">
              <div className="feature">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4>Современный дизайн</h4>
                  <p>Уникальные UI/UX решения</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4>Высокая производительность</h4>
                  <p>Оптимизация и скорость</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4>AI-интеграция</h4>
                  <p>Умные алгоритмы</p>
                </div>
              </div>
            </div>
            
            <div className="hero-actions">
              <button className="btn-primary">
                <span>Начать проект</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="m5 10 5-5 5 5M10 5v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="btn-secondary">
                <span>Посмотреть работы</span>
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">200+</div>
                <div className="stat-label">Проектов реализовано</div>
              </div>
              <div className="stat">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Время работы</div>
              </div>
              <div className="stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Техподдержка</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-container">
              <div className="tech-stack">
                <div className="tech-item">
                  <div className="tech-logo">⚛️</div>
                  <span>React</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo">📱</div>
                  <span>Next.js</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo">🔷</div>
                  <span>TypeScript</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo">🎨</div>
                  <span>Figma</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo">🤖</div>
                  <span>OpenAI</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo">☁️</div>
                  <span>AWS</span>
                </div>
              </div>
              
              <div className="code-preview">
                <div className="code-header">
                  <div className="code-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="code-title">jarvis-ai.tsx</span>
                </div>
                <div className="code-content">
                  <div className="code-line">
                    <span className="line-number">01</span>
                    <span className="code-text">
                      <span className="keyword">const</span> <span className="variable">jarvis</span> = <span className="keyword">new</span> <span className="class">AIBuilder</span>()
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">02</span>
                    <span className="code-text">
                      <span className="variable">jarvis</span>.<span className="method">create</span>(<span className="string">'website'</span>)
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">03</span>
                    <span className="code-text">
                      .<span className="method">withAI</span>(<span className="boolean">true</span>)
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">04</span>
                    <span className="code-text">
                      .<span className="method">deploy</span>()
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
