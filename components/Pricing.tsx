import React, { useState } from 'react'

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingPlan {
  id: string
  name: string
  subtitle: string
  price: string
  period: string
  description: string
  features: PricingFeature[]
  popular?: boolean
  buttonText: string
  accent: 'blue' | 'green' | 'purple'
}

const plans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    subtitle: 'Стартовое решение',
    price: '2.500.000',
    period: 'сумм / месяц',
    description: 'Идеально для небольших проектов и стартапов',
    accent: 'blue',
    buttonText: 'Начать с Basic',
    features: [
      { text: 'До 5 страни�� сайта', included: true },
      { text: 'Современный дизайн', included: true },
      { text: 'Адаптивная верстка', included: true },
      { text: 'SEO оптимизация', included: true },
      { text: 'Техподдержка email', included: true },
      { text: 'ИИ-ассистент', included: false },
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    subtitle: 'Лучший выбор',
    price: '4.000.000',
    period: 'сумм / месяц',
    description: 'Оптимальное решение для растущего бизнеса',
    accent: 'green',
    popular: true,
    buttonText: 'Выбрать Pro',
    features: [
      { text: 'Все из Basic', included: true },
      { text: 'До 15 страниц сайта', included: true },
      { text: 'ИИ-ассистент интеграция', included: true },
      { text: 'Продвинутая аналитика', included: true },
      { text: 'Приоритетная поддержка', included: true },
      { text: 'API интеграции', included: true },
    ]
  },
  {
    id: 'max',
    name: 'Max',
    subtitle: 'Премиум решение',
    price: '5.000.000',
    period: 'сумм / месяц',
    description: 'Максимум возможностей для крупного бизнеса',
    accent: 'purple',
    buttonText: 'Получить Max',
    features: [
      { text: 'Все из Pro', included: true },
      { text: 'Безлимитные страницы', included: true },
      { text: 'ДЖАРВИС ИИ полная версия', included: true },
      { text: 'Индивидуальные решения', included: true },
      { text: 'VIP поддержка 24/7', included: true },
      { text: 'Персональный менеджер', included: true },
    ]
  }
]

const PricingCard: React.FC<{ plan: PricingPlan; isHovered: boolean; onHover: () => void; onLeave: () => void }> = ({
  plan,
  isHovered,
  onHover,
  onLeave
}) => {
  const accentColors = {
    blue: {
      primary: '#3b82f6',
      secondary: '#1d4ed8',
      light: '#dbeafe',
      gradient: 'from-blue-500 to-blue-600'
    },
    green: {
      primary: '#10b981',
      secondary: '#059669',
      light: '#d1fae5',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    purple: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      light: '#ede9fe',
      gradient: 'from-violet-500 to-violet-600'
    }
  }

  const colors = accentColors[plan.accent]

  return (
    <div
      className={`pricing-card-modern ${plan.popular ? 'pricing-card-popular' : ''} ${isHovered ? 'pricing-card-hovered' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        '--accent-primary': colors.primary,
        '--accent-secondary': colors.secondary,
        '--accent-light': colors.light,
      } as React.CSSProperties}
    >
      {plan.popular && (
        <div className="popular-badge-modern">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
          </svg>
          Популярный
        </div>
      )}

      <div className="card-header-modern">
        <div className={`plan-icon-modern plan-icon-${plan.accent}`}>
          {plan.accent === 'blue' && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
            </svg>
          )}
          {plan.accent === 'green' && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
          )}
          {plan.accent === 'purple' && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="currentColor"/>
            </svg>
          )}
        </div>
        <h3 className="plan-name-modern">{plan.name}</h3>
        <p className="plan-subtitle-modern">{plan.subtitle}</p>
      </div>

      <div className="pricing-display-modern">
        <div className="price-container-modern">
          <span className="currency-modern">₽</span>
          <span className="price-amount-modern">{plan.price}</span>
        </div>
        <span className="price-period-modern">{plan.period}</span>
        <p className="price-description-modern">{plan.description}</p>
      </div>

      <div className="features-list-modern">
        {plan.features.map((feature, index) => (
          <div key={index} className={`feature-item-modern ${feature.included ? 'feature-included' : 'feature-excluded'}`}>
            <div className="feature-icon-modern">
              {feature.included ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className="feature-text-modern">{feature.text}</span>
          </div>
        ))}
      </div>

      <button className={`cta-button-modern cta-button-${plan.accent}`}>
        <span className="button-content-modern">
          {plan.buttonText}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <div className="button-shine-modern"></div>
      </button>
    </div>
  )
}

export default function Pricing() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="pricing-section-modern">
      <div className="pricing-container-modern">
        <div className="section-header-modern">
          <div className="header-badge-modern">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
            Выберите свой план
          </div>
          
          <h2 className="section-title-modern">
            <span className="title-highlight-modern">Тарифы</span> для любых задач
          </h2>
          
          <p className="section-description-modern">
            От стартапов до крупных корпораций — у нас есть идеальное решение для вашего бизнеса. 
            Прозрачные цены, полный функционал и техподдержка мирового уровня.
          </p>
        </div>

        <div className="pricing-grid-modern">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isHovered={hoveredCard === plan.id}
              onHover={() => setHoveredCard(plan.id)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
