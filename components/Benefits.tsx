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

          <div className="benefits-visual">
            <div className="visual-container">
              <div className="ai-conversation">
                <div className="conversation-header">
                  <div className="user-avatar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" fill="currentColor"/>
                      <path d="M12 14c-6 0-8 4-8 6v2h16v-2c0-2-2-6-8-6z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="conversation-info">
                    <div className="user-name">Клиент</div>
                    <div className="online-status">онлайн</div>
                  </div>
                  <div className="jarvis-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
                    </svg>
                    JARVIS
                  </div>
                </div>
                
                <div className="conversation-messages">
                  <div className="message user-message">
                    <div className="message-text">Мне нужен хороший смартфон до 300$</div>
                    <div className="message-time">14:32</div>
                  </div>
                  
                  <div className="message jarvis-message">
                    <div className="message-text">
                      Отличный выбор! Рекомендую Samsung Galaxy A54 5G. 
                      Отличная камера, быстрая работа, цена $280. 
                      Хотите подробнее о характеристиках?
                    </div>
                    <div className="message-time">14:32</div>
                  </div>
                  
                  <div className="message user-message">
                    <div className="message-text">А есть что-то похожее, но дешевле?</div>
                    <div className="message-time">14:33</div>
                  </div>
                  
                  <div className="message jarvis-message">
                    <div className="message-text">
                      Конечно! Galaxy A34 5G за $240 - практически те же возможности, 
                      немного слабее процессор. Сэкономите $40 при схожем качестве.
                      Добавить в корзину?
                    </div>
                    <div className="message-time">14:33</div>
                    <div className="message-actions">
                      <button className="action-btn">📱 Galaxy A34</button>
                      <button className="action-btn">🛒 В корзину</button>
                    </div>
                  </div>
                  
                  <div className="typing-indicator">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span>JARVIS печатает...</span>
                  </div>
                </div>
              </div>
              
              <div className="savings-calculator">
                <div className="calculator-header">
                  <div className="calculator-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M9 9h6v6H9z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span>Калькулятор экономии</span>
                </div>
                <div className="calculator-content">
                  <div className="calculation-row">
                    <span className="calc-label">Зарплата 20 сотрудников:</span>
                    <span className="calc-value negative">$20,000/мес</span>
                  </div>
                  <div className="calculation-row">
                    <span className="calc-label">ДЖАРВИС ИИ:</span>
                    <span className="calc-value positive">$2,000/мес</span>
                  </div>
                  <div className="calculation-divider"></div>
                  <div className="calculation-row total">
                    <span className="calc-label">Экономия в год:</span>
                    <span className="calc-value savings">$216,000</span>
                  </div>
                  <div className="savings-percent">90% экономии</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
