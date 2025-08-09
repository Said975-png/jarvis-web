export default function Pricing() {
  return (
    <section className="pricing-section">
      <div className="pricing-container">
        <div className="pricing-header">
          <h2 className="pricing-title">Наши цены</h2>
          <p className="pricing-subtitle">
            Выберите план, который подходит для вашего бизнеса
          </p>
        </div>

        <div className="pricing-grid">
          {/* Basic Plan */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3 className="plan-name">BASIC</h3>
              <p className="plan-description">Сайт за</p>
              <div className="plan-price">
                <span className="price-amount">2.500.000</span>
                <span className="price-currency">сум</span>
              </div>
            </div>
            <div className="pricing-card-body">
              <ul className="plan-features">
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Современный дизайн
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Адаптивная верстка
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  SEO оптимизация
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Базовый функционал
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Без ИИ ассистента
                </li>
              </ul>
            </div>
            <div className="pricing-card-footer">
              <button className="plan-button plan-button-basic">
                Выбрать план
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="pricing-card pricing-card-popular">
            <div className="popular-badge">ПОПУЛЯРНЫЙ</div>
            <div className="pricing-card-header">
              <h3 className="plan-name">PRO</h3>
              <p className="plan-description">Сайт за</p>
              <div className="plan-price">
                <span className="price-amount">4.000.000</span>
                <span className="price-currency">сум</span>
              </div>
            </div>
            <div className="pricing-card-body">
              <ul className="plan-features">
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Все функции Basic
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  ИИ ассистент для клиентов
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Умные ответы на вопросы
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Автоматические рекомендации
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Базовая аналитика
                </li>
              </ul>
            </div>
            <div className="pricing-card-footer">
              <button className="plan-button plan-button-pro">
                Выбрать план
              </button>
            </div>
          </div>

          {/* Max Plan */}
          <div className="pricing-card">
            <div className="pricing-card-header">
              <h3 className="plan-name">MAX</h3>
              <p className="plan-description">Сайт за</p>
              <div className="plan-price">
                <span className="price-amount">5.000.000</span>
                <span className="price-currency">сум</span>
              </div>
            </div>
            <div className="pricing-card-body">
              <ul className="plan-features">
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Все функции Pro
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Безграничные возможности ДЖАРВИС
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Продвинутый ИИ ассистент
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Персонализация контента
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Полная аналитика и отчеты
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Индивидуальные решения
                </li>
              </ul>
            </div>
            <div className="pricing-card-footer">
              <button className="plan-button plan-button-max">
                Выбрать план
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
