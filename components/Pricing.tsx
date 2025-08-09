export default function Pricing() {
  return (
    <section className="pricing-section">      
      <div className="pricing-container">
        <div className="pricing-header">
          <div className="pricing-badge">
            <div className="badge-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
            </div>
            Выберите свой план
          </div>
          
          <h2 className="pricing-title">
            <span className="title-highlight">Тарифы</span> дл�� любых задач
          </h2>
          
          <p className="pricing-description">
            От стартапов до крупных корпораций — у нас есть идеальное решение для вашего бизнеса. 
            Прозрачные цены, полный функционал и техподдержка мирового уровня.
          </p>
        </div>

        <div className="pricing-grid">
          {/* Basic Plan */}
          <div className="pricing-card basic-card">
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="plan-header">
                <div className="plan-icon basic-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" fill="currentColor"/>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="plan-name">Basic</h3>
                <p className="plan-subtitle">Стартовое решение</p>
              </div>
              
              <div className="plan-pricing">
                <div className="price-display">
                  <span className="currency">₽</span>
                  <span className="price-amount">2.500.000</span>
                  <span className="price-period">сумм / месяц</span>
                </div>
                <p className="price-description">Идеально для небольших проектов и стартапов</p>
              </div>

              <div className="plan-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>До 5 страниц сайта</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Современный дизайн</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Адаптивная верстка</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>SEO оптимизация</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Техподдержка email</span>
                </div>
              </div>
              
              <button className="plan-button basic-button">
                <span className="button-glow"></span>
                Выбрать Basic
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="pricing-card pro-card">
            <div className="popular-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              Популярный
              <div className="badge-glow"></div>
            </div>
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="plan-header">
                <div className="plan-icon pro-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="plan-name">Pro</h3>
                <p className="plan-subtitle">Лучший выбор</p>
              </div>
              
              <div className="plan-pricing">
                <div className="price-display">
                  <span className="currency">₽</span>
                  <span className="price-amount">4.000.000</span>
                  <span className="price-period">сумм / месяц</span>
                </div>
                <p className="price-description">Лучший выбор для растущего бизнеса</p>
              </div>

              <div className="plan-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Все из Basic +</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>До 15 страниц сайта</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>ИИ-ассистент интеграция</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Продвинутая аналитика</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Приоритетная поддержка</span>
                </div>
              </div>
              
              <button className="plan-button pro-button">
                <span className="button-glow"></span>
                Выбрать Pro
              </button>
            </div>
          </div>

          {/* Max Plan */}
          <div className="pricing-card max-card">
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="plan-header">
                <div className="plan-icon max-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L14.59 8.36L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L9.41 8.36L12 2Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="plan-name">Max</h3>
                <p className="plan-subtitle">Премиум решение</p>
              </div>
              
              <div className="plan-pricing">
                <div className="price-display">
                  <span className="currency">₽</span>
                  <span className="price-amount">5.000.000</span>
                  <span className="price-period">сумм / месяц</span>
                </div>
                <p className="price-description">Максимум возможностей для крупного бизнеса</p>
              </div>

              <div className="plan-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Все из Pro +</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Безлимитные страницы</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>ДЖАРВИС ИИ полная версия</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Индивидуальные решения</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>VIP поддержка 24/7</span>
                </div>
              </div>
              
              <button className="plan-button max-button">
                <span className="button-glow"></span>
                Выбрать Max
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
