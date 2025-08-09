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
            <div className="plan-header">
              <h3 className="plan-name">Basic Plan</h3>
            </div>
            <div className="plan-price">
              <span className="price-amount">2.5М</span>
              <span className="price-period">сум</span>
            </div>
            <p className="plan-description">
              Идеально для малого бизнеса и стартапов
            </p>
            <ul className="plan-features">
              <li className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                50 ГБ облачного хранилища
              </li>
              <li className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Базовое управление операциями
              </li>
              <li className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Простая аналитика и отчеты
              </li>
              <li className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                24/7 поддержка по email
              </li>
            </ul>
            <button className="plan-button basic-button">
              Начать
            </button>
          </div>

          {/* Pro Plan */}
          <div className="pricing-card pro-card">
            <div className="popular-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14 8H21L16 12L18 19L12 15L6 19L8 12L3 8H10L12 2Z" fill="currentColor"/>
              </svg>
              Популярный
            </div>
            <div className="plan-header">
              <h3 className="plan-name">Professional Plan</h3>
            </div>
            <div className="plan-price">
              <span className="price-amount">4М</span>
              <span className="price-period">сум в месяц</span>
            </div>
            <p className="plan-description">
              Продвинутый пакет для растущих команд и предприятий
            </p>
            <ul className="plan-features">
              <li className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                500 ГБ облачного хранилища
              </li>
              <li className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Продвинутое управление операциями
              </li>
              <li className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                A.I. аналитический движок
              </li>
              <li className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                24/7 поддержка по email и чату
              </li>
              <li className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Приоритетное обслуж��вание
              </li>
            </ul>
            <button className="plan-button pro-button">
              Обновить сейчас
            </button>
          </div>

          {/* Max Plan */}
          <div className="pricing-card max-card">
            <div className="plan-header">
              <h3 className="plan-name">Enterprise Plan</h3>
            </div>
            <div className="plan-price">
              <span className="price-amount">5М</span>
              <span className="price-period">сум в месяц</span>
            </div>
            <p className="plan-description">
              Безграничные возможности ИИ для крупных предприятий
            </p>
            <ul className="plan-features">
              <li className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Безлимитное облачное хранилище
              </li>
              <li className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Премиум управление операциями
              </li>
              <li className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Пакет A.I. аналитики и качества
              </li>
              <li className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Выделенный менеджер аккаунта
              </li>
              <li className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Поддержка по телефону
              </li>
              <li className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Индивидуальная интеграция
              </li>
            </ul>
            <button className="plan-button max-button">
              Обновить сейчас
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
