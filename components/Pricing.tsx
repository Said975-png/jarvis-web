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
            <div className="card-shine"></div>
            <div className="plan-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14 8H21L16 12L18 19L12 15L6 19L8 12L3 8H10L12 2Z" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="plan-name">BASIC</h3>
            <div className="plan-price">
              <span className="price-amount">2.5М</span>
              <span className="price-currency">сум</span>
            </div>
            <div className="plan-features">
              <span className="feature-highlight">Современный дизайн</span>
              <span className="feature-highlight">SEO оптимизация</span>
              <span className="feature-highlight">Адаптивная верстка</span>
            </div>
            <button className="plan-button">
              <span>Выбрать план</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Pro Plan */}
          <div className="pricing-card pro-card">
            <div className="popular-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14 8H21L16 12L18 19L12 15L6 19L8 12L3 8H10L12 2Z" fill="currentColor"/>
              </svg>
              ПОПУЛЯРНЫЙ
            </div>
            <div className="card-shine"></div>
            <div className="plan-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M9.049 2.927C9.3 2.015 10.7 2.015 10.951 2.927L12.4 8.422C12.553 9.04 13.115 9.455 13.756 9.455H19.609C20.565 9.455 20.969 10.791 20.228 11.328L15.854 14.56C15.334 14.931 15.088 15.594 15.241 16.212L16.69 21.707C16.941 22.619 15.814 23.364 15.073 22.827L10.699 19.595C10.179 19.224 9.471 19.224 8.951 19.595L4.577 22.827C3.836 23.364 2.709 22.619 2.96 21.707L4.409 16.212C4.562 15.594 4.316 14.931 3.796 14.56L-0.578 11.328C-1.319 10.791 -0.915 9.455 0.041 9.455H5.894C6.535 9.455 7.097 9.04 7.25 8.422L8.699 2.927H9.049Z" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="plan-name">PRO</h3>
            <div className="plan-price">
              <span className="price-amount">4М</span>
              <span className="price-currency">сум</span>
            </div>
            <div className="plan-features">
              <span className="feature-highlight">Все функции Basic</span>
              <span className="feature-highlight">ИИ ассистент</span>
              <span className="feature-highlight">Умные алгоритмы</span>
            </div>
            <button className="plan-button">
              <span>Выбрать план</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Max Plan */}
          <div className="pricing-card max-card">
            <div className="card-shine"></div>
            <div className="plan-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14.59 8.36L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L9.41 8.36L12 2Z" fill="currentColor"/>
                <circle cx="12" cy="12" r="3" fill="white"/>
              </svg>
            </div>
            <h3 className="plan-name">MAX</h3>
            <div className="plan-price">
              <span className="price-amount">5М</span>
              <span className="price-currency">сум</span>
            </div>
            <div className="plan-features">
              <span className="feature-highlight">Все функции Pro</span>
              <span className="feature-highlight">ДЖАРВИС ИИ</span>
              <span className="feature-highlight">Полная аналитика</span>
            </div>
            <button className="plan-button">
              <span>Выбрать план</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
