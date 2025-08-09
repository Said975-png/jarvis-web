export default function Features() {
  return (
    <section className="features-section">
      <div className="features-container">
        {/* How JARVIS Works */}
        <div className="jarvis-intro">
          <div className="intro-number">03</div>
          <div className="intro-content">
            <h2 className="intro-title">КАК РАБОТАЕТ ДЖАРВИС</h2>
            <h3 className="intro-subtitle">Умный помощник для ваших клиентов</h3>
            <p className="intro-description">
              Превратите каждого посетителя в клиента<br />
              Джарвис анализирует поведение пользователей и предлагает персонализированные решения в режиме реального времени
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">+40%</div>
            <div className="stat-label">Конверсия</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">3x</div>
            <div className="stat-label">Время на сайте</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">-60%</div>
            <div className="stat-label">Отказов</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="features-header">
          <h3 className="features-title">Возможности системы</h3>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h4 className="feature-title">Умная рекомендация</h4>
            <p className="feature-description">
              Анализирует историю покупок, поведение на сайте и предпочтения для точных рекомендаций товаров
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h4 className="feature-title">Персонализация</h4>
            <p className="feature-description">
              Адаптирует интерфейс и контент под каждого пользователя, создавая уникальный опыт покупок
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h4 className="feature-title">Поддержка 24/7</h4>
            <p className="feature-description">
              Мгновенные ответы на вопросы клиентов в любое время, без выходных и праздников
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h4 className="feature-title">Аналитика продаж</h4>
            <p className="feature-description">
              Детальная отчет��ость по эффективности, популярным товарам и поведению покупателей
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <polyline points="16,18 22,12 16,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="8,6 2,12 8,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h4 className="feature-title">Простая интеграция</h4>
            <p className="feature-description">
              Запуск за 24 часа без изменения существующего сайта
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
