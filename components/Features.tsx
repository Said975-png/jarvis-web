import { useState, useEffect } from 'react'

export default function Features() {
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
    <section className="features-section">
      {/* Background Decorative Elements */}
      <div className="bg-decoration">
        <div 
          className="floating-orb orb-1" 
          style={{
            transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.06}px)`
          }}
        />
        <div 
          className="floating-orb orb-2"
          style={{
            transform: `translate(${mousePosition.x * -0.04}px, ${mousePosition.y * 0.07}px)`
          }}
        />
        <div className="grid-pattern" />
      </div>

      <div className="features-container">
        {/* Features Main Content */}
        <div className="features-main">
          <div className="features-content">
            <div className="features-badge">
              <div className="badge-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L14 8H21L16 12L18 19L12 15L6 19L8 12L3 8H10L12 2Z" fill="currentColor"/>
                </svg>
              </div>
              Наши преимущества
            </div>

            <h2 className="features-title">
              <span className="title-highlight">Инновационные</span><br />
              AI-решения для бизнеса
            </h2>

            <p className="features-description">
              Откройте для себя мощь искусственного интеллекта в веб-разработке. 
              Наши передовые технологии создают уникальный пользовательский опыт 
              и помогают вашему бизнесу достигать новых высот.
            </p>

            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <h4>Стильные AI-дизайны</h4>
                  <p>50+ готовых шаблонов</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="3" fill="currentColor"/>
                    <path d="M12 11C13.1 11 14 11.9 14 13V17H10V13C10 11.9 10.9 11 12 11Z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <h4>ДЖАРВИС ИИ-Ассистент</h4>
                  <p>99.8% точность ответов</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H6L10 22L14 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <h4>Персональный подход</h4>
                  <p>10x увеличение конверсии</p>
                </div>
              </div>
            </div>

            <div className="features-stats">
              <div className="stat">
                <div className="stat-number">95%</div>
                <div className="stat-label">Удовлетворенность клиентов</div>
              </div>
              <div className="stat">
                <div className="stat-number">3x</div>
                <div className="stat-label">Рост продаж</div>
              </div>
              <div className="stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">AI поддержка</div>
              </div>
            </div>
          </div>

          <div className="features-visual">
            <div className="visual-container">
              <div className="ai-capabilities">
                <div className="capability-item">
                  <div className="capability-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span>Машинное обучение</span>
                </div>
                <div className="capability-item">
                  <div className="capability-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span>Анализ данных</span>
                </div>
                <div className="capability-item">
                  <div className="capability-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span>А��томатизация</span>
                </div>
                <div className="capability-item">
                  <div className="capability-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span>Оптимизация</span>
                </div>
                <div className="capability-item">
                  <div className="capability-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span>Cloud AI</span>
                </div>
                <div className="capability-item">
                  <div className="capability-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span>Computer Vision</span>
                </div>
              </div>
              
              <div className="ai-dashboard">
                <div className="dashboard-header">
                  <div className="dashboard-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="dashboard-title">AI Analytics</span>
                </div>
                <div className="dashboard-content">
                  <div className="metric-card">
                    <div className="metric-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M3 17V7C3 5.9 3.9 5 5 5H19C20.1 5 21 5.9 21 7V17C21 18.1 20.1 19 19 19H5C3.9 19 3 18.1 3 17Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M7 13L10 10L13 13L17 9" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="metric-value">98.5%</div>
                    <div className="metric-label">Accuracy</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="metric-value">0.3s</div>
                    <div className="metric-label">Response</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                        <path d="m22 21-3-3m0 0a5 5 0 1 0-7 0l3 3a5 5 0 0 0 7 0z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="metric-value">15K+</div>
                    <div className="metric-label">Users</div>
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
