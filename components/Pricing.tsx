export default function Pricing() {
  return (
    <section className="pricing-section">
      {/* Background Decorative Elements - like hero section */}
      <div className="pricing-bg-decoration">
        <div className="pricing-orb pricing-orb-1" />
        <div className="pricing-orb pricing-orb-2" />
        <div className="pricing-grid-pattern" />
      </div>

      <div className="pricing-container">
        <div className="pricing-header">
          <div className="section-number">02</div>
          <h2 className="pricing-title">Наши цены</h2>
          <p className="pricing-subtitle">
            Выберите план, который подходит для вашего бизнеса
          </p>
        </div>

        <div className="pricing-grid">
          {/* Basic Plan */}
          <div className="pricing-card basic-card">
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="plan-icon-wrapper">
                <div className="plan-icon basic-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" fill="currentColor"/>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <div className="plan-header">
                <h3 className="plan-name">BASIC</h3>
                <div className="plan-subtitle">Стартовый</div>
              </div>
              <div className="plan-price">
                <div className="price-wrapper">
                  <span className="price-amount">2.500.000</span>
                  <span className="currency">сумм</span>
                </div>
                <span className="price-period">за проект</span>
              </div>
              <div className="plan-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Современный дизайн</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Адаптивная верстка</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>SEO оптимизация</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Техподдержка</span>
                </div>
              </div>
              <button className="plan-button basic-button">
                <span>Выбрать план</span>
                <div className="button-glow"></div>
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="pricing-card pro-card">
            <div className="popular-badge">
              <div className="badge-glow"></div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14 8H21L16 12L18 19L12 15L6 19L8 12L3 8H10L12 2Z" fill="currentColor"/>
              </svg>
              <span>ПОПУЛЯРНЫЙ</span>
            </div>
            <div className="card-glow pro-glow"></div>
            <div className="card-content">
              <div className="plan-icon-wrapper">
                <div className="plan-icon pro-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L14 8H21L16 12L18 19L12 15L6 19L8 12L3 8H10L12 2Z" fill="currentColor"/>
                    <circle cx="12" cy="12" r="2" fill="white"/>
                  </svg>
                </div>
              </div>
              <div className="plan-header">
                <h3 className="plan-name">PRO</h3>
                <div className="plan-subtitle">Профессиональный</div>
              </div>
              <div className="plan-price">
                <div className="price-wrapper">
                  <span className="price-amount">4.000.000</span>
                  <span className="currency">сумм</span>
                </div>
                <span className="price-period">за проект</span>
              </div>
              <div className="plan-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Все функции Basic +</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>ИИ ассистент</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Продвинутая аналитика</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Приоритетная поддержка</span>
                </div>
              </div>
              <button className="plan-button pro-button">
                <span>Выбрать план</span>
                <div className="button-glow"></div>
              </button>
            </div>
          </div>

          {/* Max Plan */}
          <div className="pricing-card max-card">
            <div className="card-glow max-glow"></div>
            <div className="card-content">
              <div className="plan-icon-wrapper">
                <div className="plan-icon max-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L14.59 8.36L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L9.41 8.36L12 2Z" fill="currentColor"/>
                    <circle cx="12" cy="12" r="3" fill="white"/>
                    <circle cx="12" cy="12" r="1" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <div className="plan-header">
                <h3 className="plan-name">MAX</h3>
                <div className="plan-subtitle">Максимум</div>
              </div>
              <div className="plan-price">
                <div className="price-wrapper">
                  <span className="currency">₽</span>
                  <span className="price-amount">5М</span>
                </div>
                <span className="price-period">за проект</span>
              </div>
              <div className="plan-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Все функции Pro +</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>ДЖАРВИС ИИ</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Индивидуальные решения</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>VIP поддержка 24/7</span>
                </div>
              </div>
              <button className="plan-button max-button">
                <span>Выбрать план</span>
                <div className="button-glow"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
