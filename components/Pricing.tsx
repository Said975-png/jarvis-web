import { useState } from 'react'

const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic',
    subtitle: 'Стартовое решение',
    price: '2.500.000',
    period: 'сумм / месяц',
    description: 'Идеально для небольших проектов и стартапов',
    popular: false,
    features: [
      'До 5 страниц сайта',
      'Современный дизайн',
      'Адаптивная верстка',
      'SEO оптимизация',
      'Техподдержка email'
    ],
    cardClass: 'basic-card',
    buttonClass: 'basic-button',
    iconClass: 'basic-icon'
  },
  {
    id: 'pro',
    name: 'Pro',
    subtitle: 'Лучший выбор',
    price: '4.000.000',
    period: 'сумм / месяц',
    description: 'Лучший выбор для растущего бизнеса',
    popular: true,
    features: [
      'Все из Basic +',
      'До 15 страниц сайта',
      'ИИ-ассистент интеграция',
      'Продвинутая аналитика',
      'Приоритетная поддержка'
    ],
    cardClass: 'pro-card',
    buttonClass: 'pro-button',
    iconClass: 'pro-icon'
  },
  {
    id: 'max',
    name: 'Max',
    subtitle: 'Премиум решение',
    price: '5.000.000',
    period: 'сумм / месяц',
    description: 'Максимум возможностей для крупного бизнеса',
    popular: false,
    features: [
      'Все из Pro +',
      'Безлимитные страницы',
      'ДЖАРВИС ИИ полная версия',
      'Индивидуальные решения',
      'VIP поддержка 24/7'
    ],
    cardClass: 'max-card',
    buttonClass: 'max-button',
    iconClass: 'max-icon'
  }
]

export default function Pricing() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="pricing-section-modern">
      {/* Background Elements */}
      <div className="modern-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="pricing-container-modern">
        {/* Header */}
        <div className="pricing-header-modern">
          <div className="pricing-badge-modern">
            <svg className="badge-icon-svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Выберите свой план
          </div>
          
          <h2 className="pricing-title-modern">
            <span className="title-gradient">Тарифы</span> для любых задач
          </h2>
          
          <p className="pricing-description-modern">
            От стартапов до крупных корпораций — у нас есть идеальное решение для вашего бизнеса. 
            Прозрачные цены, полный функционал и техподдержка мирового уровня.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid-modern">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card-modern ${plan.cardClass} ${hoveredCard === plan.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(plan.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="popular-badge-modern">
                  <svg className="popular-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Популярный
                </div>
              )}

              {/* Card Content */}
              <div className="card-content-modern">
                {/* Plan Header */}
                <div className="plan-header-modern">
                  <div className={`plan-icon-modern ${plan.iconClass}`}>
                    {plan.id === 'basic' && (
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
                      </svg>
                    )}
                    {plan.id === 'pro' && (
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                    {plan.id === 'max' && (
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    )}
                  </div>
                  
                  <h3 className="plan-name-modern">{plan.name}</h3>
                  <p className="plan-subtitle-modern">{plan.subtitle}</p>
                </div>

                {/* Pricing */}
                <div className="plan-pricing-modern">
                  <div className="price-display-modern">
                    <span className="currency-modern">₽</span>
                    <span className="price-amount-modern">{plan.price}</span>
                  </div>
                  <p className="price-period-modern">{plan.period}</p>
                  <p className="price-description-modern">{plan.description}</p>
                </div>

                {/* Features */}
                <div className="plan-features-modern">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="feature-item-modern">
                      <div className="feature-icon-modern">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="feature-text-modern">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button className={`plan-button-modern ${plan.buttonClass}`}>
                  <span className="button-glow-modern"></span>
                  Выбрать {plan.name}
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="card-decoration card-decoration-1"></div>
              <div className="card-decoration card-decoration-2"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="pricing-cta-modern">
          <p className="cta-text-modern">
            Нужно что-то особенное? Свяжитесь с нами для индивидуального предложения
          </p>
          <button className="cta-button-modern">
            <svg className="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Связаться с нами
          </button>
        </div>
      </div>

      <style jsx>{`
        .pricing-section-modern {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 25%, #e0e7ff 50%, #eff6ff 75%, #f8fafc 100%);
          padding: 6rem 1rem;
          overflow: hidden;
        }

        .modern-background {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(24px);
          mix-blend-mode: multiply;
          opacity: 0.2;
          animation: blob 7s infinite;
        }

        .blob-1 {
          top: 0;
          left: 25%;
          width: 24rem;
          height: 24rem;
          background: #60a5fa;
        }

        .blob-2 {
          top: 0;
          right: 25%;
          width: 24rem;
          height: 24rem;
          background: #a78bfa;
          animation-delay: 2s;
        }

        .blob-3 {
          bottom: 0;
          left: 33.333333%;
          width: 24rem;
          height: 24rem;
          background: #f472b6;
          animation-delay: 4s;
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        .pricing-container-modern {
          position: relative;
          max-width: 80rem;
          margin: 0 auto;
          z-index: 10;
        }

        .pricing-header-modern {
          text-align: center;
          margin-bottom: 5rem;
        }

        .pricing-badge-modern {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #dbeafe;
          color: #1d4ed8;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 1.5rem;
        }

        .badge-icon-svg {
          width: 1rem;
          height: 1rem;
        }

        .pricing-title-modern {
          font-size: 3.75rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1.5rem;
          line-height: 1;
        }

        .title-gradient {
          background: linear-gradient(to right, #2563eb, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pricing-description-modern {
          font-size: 1.25rem;
          color: #475569;
          max-width: 48rem;
          margin: 0 auto;
          line-height: 1.625;
        }

        .pricing-grid-modern {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 5rem;
        }

        .pricing-card-modern {
          position: relative;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow:
            0 8px 32px rgba(31, 38, 135, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          min-height: 550px;
          display: flex;
          flex-direction: column;
        }

        .pricing-card-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 100%
          );
          border-radius: 1.5rem;
          z-index: -1;
        }

        .pricing-card-modern:hover,
        .pricing-card-modern.hovered {
          transform: translateY(-8px) scale(1.02);
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow:
            0 20px 40px rgba(31, 38, 135, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            0 1px 3px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
        }

        .pro-card {
          transform: scale(1.05);
          background: rgba(37, 99, 235, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: white;
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          box-shadow:
            0 12px 40px rgba(37, 99, 235, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .pro-card::before {
          background: linear-gradient(
            135deg,
            rgba(37, 99, 235, 0.1) 0%,
            rgba(139, 92, 246, 0.1) 100%
          );
        }

        .pro-card:hover,
        .pro-card.hovered {
          transform: scale(1.08) translateY(-8px);
          background: rgba(37, 99, 235, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          box-shadow:
            0 25px 50px rgba(37, 99, 235, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .pro-card .plan-name-modern,
        .pro-card .plan-subtitle-modern,
        .pro-card .price-amount-modern,
        .pro-card .feature-text-modern {
          color: white;
        }

        .popular-badge-modern {
          position: absolute;
          top: -0.75rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(250, 204, 21, 0.2);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.375rem;
          box-shadow:
            0 8px 32px rgba(250, 204, 21, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          z-index: 20;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .popular-badge-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(250, 204, 21, 0.3), rgba(245, 158, 11, 0.2));
          border-radius: 50px;
          z-index: -1;
        }

        .popular-icon {
          width: 1rem;
          height: 1rem;
        }

        .card-content-modern {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .plan-header-modern {
          text-align: center;
          margin-bottom: 2rem;
        }

        .plan-icon-modern {
          width: 4rem;
          height: 4rem;
          margin: 0 auto 1rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow:
            0 10px 15px -3px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .plan-icon-modern svg {
          width: 2rem;
          height: 2rem;
        }

        .basic-icon {
          background: linear-gradient(135deg, #64748b, #475569);
          color: white;
        }

        .pro-icon {
          background: linear-gradient(135deg, #facc15, #f59e0b);
          color: white;
        }

        .max-icon {
          background: linear-gradient(135deg, #8b5cf6, #a855f7);
          color: white;
        }

        .plan-name-modern {
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #0f172a;
        }

        .plan-subtitle-modern {
          color: #475569;
          font-size: 0.875rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .plan-pricing-modern {
          text-align: center;
          margin-bottom: 2rem;
        }

        .price-display-modern {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          margin-bottom: 0.5rem;
        }

        .currency-modern {
          font-size: 1.125rem;
          font-weight: 600;
          color: #475569;
        }

        .price-amount-modern {
          font-size: 2.5rem;
          font-weight: 900;
          color: #2563eb;
          line-height: 1;
        }

        .price-period-modern {
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
        }

        .price-description-modern {
          color: #475569;
          font-size: 0.875rem;
          line-height: 1.625;
        }

        .plan-features-modern {
          margin-bottom: 2rem;
          flex-grow: 1;
        }

        .feature-item-modern {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.75rem;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .feature-item-modern:hover {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transform: translateX(5px);
        }

        .feature-icon-modern {
          flex-shrink: 0;
          width: 1.25rem;
          height: 1.25rem;
          background: rgba(34,197,94,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature-icon-modern svg {
          width: 0.75rem;
          height: 0.75rem;
          color: #22c55e;
        }

        .pro-card .feature-icon-modern {
          background: rgba(255,255,255,0.2);
        }

        .pro-card .feature-icon-modern svg {
          color: white;
        }

        .feature-text-modern {
          color: #475569;
          font-size: 0.875rem;
        }

        .plan-button-modern {
          position: relative;
          width: 100%;
          padding: 1rem 2rem;
          border-radius: 1rem;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          overflow: hidden;
          z-index: 1;
        }

        .basic-button {
          background: rgba(255, 255, 255, 0.1);
          color: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          box-shadow:
            0 4px 15px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .basic-button:hover {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(37, 99, 235, 0.4);
          color: #2563eb;
          transform: scale(1.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            0 8px 25px rgba(37, 99, 235, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .pro-button {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
        }

        .pro-button:hover {
          background: rgba(255, 255, 255, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.4);
          transform: scale(1.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            0 8px 25px rgba(255, 255, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .max-button {
          background: rgba(255, 255, 255, 0.1);
          color: #8b5cf6;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
        }

        .max-button:hover {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.4);
          color: #8b5cf6;
          transform: scale(1.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            0 8px 25px rgba(139, 92, 246, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .button-glow-modern {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.6s ease;
          z-index: -1;
        }

        .plan-button-modern:hover .button-glow-modern {
          left: 100%;
        }

        .card-decoration {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          pointer-events: none;
        }

        .card-decoration-1 {
          top: 0;
          right: 0;
          width: 8rem;
          height: 8rem;
          transform: translate(4rem, -4rem);
        }

        .card-decoration-2 {
          bottom: 0;
          left: 0;
          width: 6rem;
          height: 6rem;
          transform: translate(-3rem, 3rem);
        }

        .pricing-cta-modern {
          text-align: center;
        }

        .cta-text-modern {
          color: #475569;
          margin-bottom: 1.5rem;
        }

        .cta-button-modern {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #0f172a;
          color: white;
          padding: 1rem 2rem;
          border-radius: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .cta-button-modern:hover {
          background: #1e293b;
          transform: scale(1.05);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }

        .cta-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        @media (max-width: 768px) {
          .pricing-title-modern {
            font-size: 2.5rem;
          }

          .pricing-description-modern {
            font-size: 1rem;
          }

          .pricing-grid-modern {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .pricing-card-modern {
            padding: 1.5rem;
            min-height: auto;
          }

          .pro-card {
            transform: none;
          }

          .pro-card:hover,
          .pro-card.hovered {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </section>
  )
}
