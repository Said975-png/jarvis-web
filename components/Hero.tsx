export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <header className="hero-header">
          <div className="logo-section">
            <h1 className="company-name">JARVIS</h1>
            <div className="company-tagline">Artificial Intelligence Solutions</div>
          </div>
        </header>

        <div className="hero-content">
          <div className="content-left">
            <h2 className="hero-title">
              Разработка веб-решений<br />
              корпоративного уровня
            </h2>

            <p className="hero-description">
              Мы создаем высокопроизводительные веб-приложения и цифровые платформы,
              используя технологии искусственного интеллекта для автоматизации
              бизнес-процессов и повышения эффективности компаний.
            </p>

            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">01</div>
                <div className="feature-text">
                  <h4>Enterprise Solutions</h4>
                  <p>Корпоративные системы</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">02</div>
                <div className="feature-text">
                  <h4>AI Integration</h4>
                  <p>Интеграция ИИ технологий</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">03</div>
                <div className="feature-text">
                  <h4>Custom Development</h4>
                  <p>Индивидуальная разработка</p>
                </div>
              </div>
            </div>

            <div className="cta-section">
              <button className="cta-primary">
                Обсудить проект
              </button>
              <button className="cta-secondary">
                Портфолио
              </button>
            </div>
          </div>

          <div className="content-right">
            <div className="tech-showcase">
              <div className="tech-grid">
                <div className="tech-item active">
                  <div className="tech-label">Frontend</div>
                  <div className="tech-value">React, Next.js, TypeScript</div>
                </div>
                <div className="tech-item">
                  <div className="tech-label">Backend</div>
                  <div className="tech-value">Node.js, Python, PostgreSQL</div>
                </div>
                <div className="tech-item">
                  <div className="tech-label">AI/ML</div>
                  <div className="tech-value">TensorFlow, OpenAI, LangChain</div>
                </div>
                <div className="tech-item">
                  <div className="tech-label">Infrastructure</div>
                  <div className="tech-value">AWS, Docker, Kubernetes</div>
                </div>
              </div>

              <div className="metrics-section">
                <div className="metric">
                  <div className="metric-number">98%</div>
                  <div className="metric-label">Uptime</div>
                </div>
                <div className="metric">
                  <div className="metric-number">150+</div>
                  <div className="metric-label">Projects</div>
                </div>
                <div className="metric">
                  <div className="metric-number">24/7</div>
                  <div className="metric-label">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
