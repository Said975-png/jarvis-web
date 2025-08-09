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
              <p className="plan-description">Базовый сайт</p>
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
                  Техподдержка 3 месяца
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
              <p className="plan-description">Профессиональный сайт</p>
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
                  ИИ помощник для клиентов
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Ответы на вопросы как человек
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Предложение товаров
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Расширенная аналитика
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Техподдержка 6 месяцев
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
              <p className="plan-description">Максимальный сайт</p>
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
                  Огромный функционал
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Улучшенный ИИ помощник
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Крутой премиум дизайн
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Индивидуальные решения
                </li>
                <li className="feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Техподдержка 12 месяцев
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
