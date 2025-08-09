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
    gradient: 'from-slate-900 to-slate-800',
    buttonStyle: 'bg-white text-slate-900 hover:bg-gray-100',
    iconColor: 'text-blue-400'
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
    gradient: 'from-blue-600 to-purple-600',
    buttonStyle: 'bg-white text-blue-600 hover:bg-gray-100',
    iconColor: 'text-yellow-400'
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
    gradient: 'from-purple-900 to-slate-900',
    buttonStyle: 'bg-white text-purple-900 hover:bg-gray-100',
    iconColor: 'text-purple-400'
  }
]

export default function Pricing() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-24 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Выберите свой план
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-6">
            <span className="text-blue-600">Тарифы</span> для любых задач
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            От стартапов до крупных корпораций — у нас есть идеальное решение для вашего бизнеса. 
            Прозрачные цены, полный функционал и техподдержка мирового уровня.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`
                relative group cursor-pointer transform transition-all duration-500
                ${hoveredCard === plan.id ? 'scale-105 z-10' : 'scale-100'}
                ${plan.popular ? 'lg:-mt-6 lg:mb-6' : ''}
              `}
              onMouseEnter={() => setHoveredCard(plan.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Популярный
                    </div>
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`
                relative h-full bg-gradient-to-br ${plan.gradient} rounded-3xl p-8 shadow-2xl 
                border border-white/20 backdrop-blur-sm overflow-hidden
                transition-all duration-500 group-hover:shadow-3xl
              `}>
                {/* Glow Effect */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 
                  transition-opacity duration-500 group-hover:opacity-20 rounded-3xl
                `}></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${plan.iconColor} bg-white/10 rounded-2xl mb-4 backdrop-blur-sm`}>
                      {plan.id === 'basic' && (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="3"></circle>
                          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
                        </svg>
                      )}
                      {plan.id === 'pro' && (
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      )}
                      {plan.id === 'max' && (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-white/80 text-sm">{plan.subtitle}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <span className="text-white/80 text-lg">₽</span>
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                    </div>
                    <p className="text-white/70 text-sm mb-3">{plan.period}</p>
                    <p className="text-white/80 text-sm leading-relaxed">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white/90 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <button className={`
                    w-full ${plan.buttonStyle} py-4 px-6 rounded-2xl font-semibold text-center
                    transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg
                    backdrop-blur-sm border border-white/20
                  `}>
                    Выбрать {plan.name}
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-slate-600 mb-6">
            Нужно что-то особенное? Свяжитесь с нами для индивидуального предложения
          </p>
          <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Связаться с нами
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}
