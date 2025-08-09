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
            <span className="title-highlight">Тарифы</span> для любых задач
          </h2>
          
          <p className="pricing-description">
            От стартапов до крупных корпораций — у нас есть идеальное решение для вашего бизнеса. 
            Прозрачные цены, полный функционал и техподдержка мирового уровня.
          </p>
        </div>

        <div className="pricing-cards">
          {/* Basic Plan */}
          <div className="pricing-card basic">
            <div className="card-header">
              <div className="plan-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="plan-name">Basic</h3>
              <p className="plan-description">Идеально для небольших проектов и стартапов</p>
              <div className="plan-price">
                <span className="price-amount">2.500.000</span>
                <span className="price-currency">сумм</span>
                <span className="price-period">/месяц</span>
              </div>
            </div>
            
            <div className="card-features">
              <div className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>До 5 страниц сайта</span>
              </div>
              <div className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Современный дизайн</span>
              </div>
              <div className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Адаптивная верстка</span>
              </div>
              <div className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>SEO оптимизация</span>
              </div>
              <div className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Техподдержка email</span>
              </div>
            </div>
            
            <button className="choose-plan-btn basic-btn">
              Выбрать Basic
            </button>
          </div>

          {/* Pro Plan */}
          <div className="pricing-card pro featured">
            <div className="popular-badge">Популярный</div>
            <div className="card-header">
              <div className="plan-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="plan-name">Pro</h3>
              <p className="plan-description">Лучший выбор для растущего бизнеса</p>
              <div className="plan-price">
                <span className="price-amount">4.000.000</span>
                <span className="price-currency">сумм</span>
                <span className="price-period">/месяц</span>
              </div>
            </div>
            
            <div className="card-features">
              <div className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Все из Basic +</span>
              </div>
              <div className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>До 15 страниц сайта</span>
              </div>
              <div className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>ИИ-ассистент интеграция</span>
              </div>
              <div className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Продвинутая аналитика</span>
              </div>
              <div className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Приоритетная поддержка</span>
              </div>
            </div>
            
            <button className="choose-plan-btn pro-btn">
              Выбрать Pro
            </button>
          </div>

          {/* Max Plan */}
          <div className="pricing-card max">
            <div className="card-header">
              <div className="plan-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L14.59 8.36L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L9.41 8.36L12 2Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="plan-name">Max</h3>
              <p className="plan-description">Максимум возможностей для крупного бизнеса</p>
              <div className="plan-price">
                <span className="price-amount">5.000.000</span>
                <span className="price-currency">сумм</span>
                <span className="price-period">/месяц</span>
              </div>
            </div>
            
            <div className="card-features">
              <div className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Все из Pro +</span>
              </div>
              <div className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Безлимитные страницы</span>
              </div>
              <div className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>ДЖАРВИС ИИ полная версия</span>
              </div>
              <div className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Индивидуальные решения</span>
              </div>
              <div className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>VIP поддержка 24/7</span>
              </div>
            </div>
            
            <button className="choose-plan-btn max-btn">
              Выбрать Max
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
