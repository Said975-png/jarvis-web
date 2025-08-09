import { useState, useEffect } from 'react'

export default function Pricing() {
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
    <section className="pricing-section">
      <div className="pricing-container">
        {/* Pricing Main Content */}
        <div className="pricing-main">
          <div className="pricing-content">
            <div className="pricing-badge">
              <div className="badge-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L14 8H21L16 12L18 19L12 15L6 19L8 12L3 8H10L12 2Z" fill="currentColor"/>
                </svg>
              </div>
              Прозрачные цены
            </div>

            <h2 className="pricing-title">
              Честные <span className="title-highlight">цены</span><br />
              без скрытых платежей
            </h2>

            <p className="pricing-description">
              Выберите план, который подходит именно вашему бизнесу. 
              Все цены фиксированные, никаких доплат или скрытых комиссий. 
              Полная прозрачность и максимальная выгода для вашего проекта.
            </p>

            <div className="pricing-plans">
              <div className="plan-item">
                <div className="plan-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" fill="currentColor"/>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h4>BASIC Plan</h4>
                  <p>2.500.000 сумм - Стартовый пакет</p>
                </div>
              </div>
              <div className="plan-item featured">
                <div className="plan-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L14 8H21L16 12L18 19L12 15L6 19L8 12L3 8H10L12 2Z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <h4>PRO Plan</h4>
                  <p>4.000.000 сумм - Лучший выбор</p>
                </div>
              </div>
              <div className="plan-item">
                <div className="plan-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L14.59 8.36L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L9.41 8.36L12 2Z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <h4>MAX Plan</h4>
                  <p>5.000.000 сумм - Максимум возможностей</p>
                </div>
              </div>
            </div>

            <div className="pricing-stats">
              <div className="stat">
                <div className="stat-number">0%</div>
                <div className="stat-label">Скрытых доплат</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Прозрачность</div>
              </div>
              <div className="stat">
                <div className="stat-number">30</div>
                <div className="stat-label">Дней гарантии</div>
              </div>
            </div>
          </div>

          <div className="pricing-visual">
            <div className="visual-container">
              <div className="plans-comparison">
                <div className="comparison-item basic">
                  <div className="comparison-header">
                    <div className="plan-badge basic-badge">BASIC</div>
                    <div className="plan-price">2.5М</div>
                  </div>
                  <div className="comparison-features">
                    <div className="feature-check">✓ Современный дизайн</div>
                    <div className="feature-check">✓ Адаптивная верстка</div>
                    <div className="feature-check">✓ SEO оптимизация</div>
                    <div className="feature-check">✓ Техподдержка</div>
                  </div>
                </div>
                
                <div className="comparison-item pro featured">
                  <div className="comparison-header">
                    <div className="plan-badge pro-badge">PRO</div>
                    <div className="plan-price">4М</div>
                    <div className="popular-tag">Популярный</div>
                  </div>
                  <div className="comparison-features">
                    <div className="feature-check">✓ Все из Basic +</div>
                    <div className="feature-check">✓ ИИ ассистент</div>
                    <div className="feature-check">✓ Продвинутая аналитика</div>
                    <div className="feature-check">✓ Приоритетная поддержка</div>
                  </div>
                </div>
                
                <div className="comparison-item max">
                  <div className="comparison-header">
                    <div className="plan-badge max-badge">MAX</div>
                    <div className="plan-price">5М</div>
                  </div>
                  <div className="comparison-features">
                    <div className="feature-check">✓ Все из Pro +</div>
                    <div className="feature-check">✓ ДЖАРВИС ИИ</div>
                    <div className="feature-check">✓ Индивидуальные решения</div>
                    <div className="feature-check">✓ VIP поддержка 24/7</div>
                  </div>
                </div>
              </div>
              
              <div className="cost-calculator">
                <div className="calculator-header">
                  <div className="calculator-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M9 9h6v6H9z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span>Калькулятор стоимости</span>
                </div>
                <div className="calculator-content">
                  <div className="calc-row">
                    <span className="calc-label">Стоимость разработки:</span>
                    <span className="calc-value highlighted">4.000.000 сумм</span>
                  </div>
                  <div className="calc-row">
                    <span className="calc-label">Поддержка (год):</span>
                    <span className="calc-value">включена</span>
                  </div>
                  <div className="calc-row">
                    <span className="calc-label">Обновления:</span>
                    <span className="calc-value">бесплатно</span>
                  </div>
                  <div className="calc-divider"></div>
                  <div className="calc-row total">
                    <span className="calc-label">Итого к оплате:</span>
                    <span className="calc-value final">4.000.000 сумм</span>
                  </div>
                  <div className="savings-note">Экономия на поддержке: 1.200.000 сумм</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
