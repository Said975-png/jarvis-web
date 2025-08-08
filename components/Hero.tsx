import { useState, useEffect } from 'react'

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className={`hero-content ${isLoaded ? 'loaded' : ''}`}>
          <div className="logo-container">
            <h1 className="hero-title">
              <span className="jarvis-text">JARVIS</span>
              <span className="ai-indicator">AI</span>
            </h1>
          </div>
          
          <h2 className="hero-subtitle">
            Создаем крутые веб-сайты с<br />
            <span className="highlight">искусственным интеллектом</span>
          </h2>
          
          <p className="hero-description">
            Наша команда разрабатывает современн��е веб-решения, используя передовые технологии 
            искусственного интеллекта для создания уникальных пользовательских интерфейсов 
            и невероятного пользовательского опыта.
          </p>
          
          <div className="hero-actions">
            <button className="cta-primary">
              <span>Начать проект</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L15 8L8 15M15 8H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="cta-secondary">
              Узнать больше
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Проектов</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Клиентов</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Поддержка</span>
            </div>
          </div>
        </div>
        
        <div className={`hero-visual ${isLoaded ? 'loaded' : ''}`}>
          <div className="ai-visualization">
            <div className="neural-network">
              <div className="node node-1"></div>
              <div className="node node-2"></div>
              <div className="node node-3"></div>
              <div className="node node-4"></div>
              <div className="node node-5"></div>
              <div className="connection connection-1"></div>
              <div className="connection connection-2"></div>
              <div className="connection connection-3"></div>
            </div>
            <div className="code-blocks">
              <div className="code-block block-1">
                <span className="code-line">const ai = new JARVIS()</span>
              </div>
              <div className="code-block block-2">
                <span className="code-line">website.generate()</span>
              </div>
              <div className="code-block block-3">
                <span className="code-line">deploy.success ✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
