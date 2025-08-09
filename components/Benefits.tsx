import { useState, useEffect } from 'react'

export default function Benefits() {
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
    <section className="benefits-section">
      {/* Global background handles all decorations */}

      <div className="benefits-container">
        {/* Benefits Main Content */}
        <div className="benefits-main">
          <div className="benefits-content">
            <div className="benefits-badge">
              <div className="badge-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              Революционный ИИ-ассистент
            </div>

            <h2 className="benefits-title">
              ДЖАРВИС заменяет <span className="title-highlight">целую команду</span><br />
              продавцов-консультантов
            </h2>

            <p className="benefits-description">
              Один умный ассистент выполняет работу десятков сотрудников. ДЖАРВИС 
              ведет естественные диалоги с клиентами, предлагает товары, консультирует 
              и находит лучшие предложения 24/7 без перерывов и выходных.
            </p>

            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="m22 21-3-3m0 0a5 5 0 1 0-7 0l3 3a5 5 0 0 0 7 0z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h4>Замена штата продавцов</h4>
                  <p>Один ИИ = 20+ консультантов</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h4>Умный подбор товаров</h4>
                  <p>Анализирует потребности клиента</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H6L10 22L14 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <h4>Живое общение</h4>
                  <p>Общается как человек</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v6m6 2-6 6-6-6" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="21" r="1" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h4>Поиск выгодных аналогов</h4>
                  <p>Находит дешевые альтернативы</p>
                </div>
              </div>
            </div>

            <div className="benefits-stats">
              <div className="stat">
                <div className="stat-number">1 ИИ</div>
                <div className="stat-label">заменяет 20+ сотрудников</div>
              </div>
              <div className="stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">без перерывов</div>
              </div>
              <div className="stat">
                <div className="stat-number">90%</div>
                <div className="stat-label">экономия на зарплатах</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
