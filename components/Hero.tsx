import { useState, useEffect } from 'react'

export default function Hero() {
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const partnerships = [
    {
      name: 'Vivo website',
      description: 'Современный корпоративный сайт',
      tech: 'React • Next.js • TypeScript',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      name: 'Ghon bot web',
      description: 'ИИ-бот платформа',
      tech: 'Node.js • AI Integration • WebSocket',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      name: 'azio.ru',
      description: 'E-commerce решение',
      tech: 'React • Redux • Payment API',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      name: 'port.web',
      description: 'Портфолио платформа',
      tech: 'Vue.js • Nuxt • Portfolio CMS',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % partnerships.length)
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(timer)
  }, [partnerships.length])

  return (
    <section className="hero-section-chatgpt">
      <div className="hero-container-chatgpt">
        {/* Main Content */}
        <div className="hero-main-chatgpt">
          <div className="hero-content-chatgpt">
            <h1 className="hero-title-chatgpt">
              Создаем веб-решения будущего с помощью ИИ
            </h1>

            <p className="hero-description-chatgpt">
              Революционный ИИ-ассистент, который понимает ваши потребности и превращает идеи в реальность. Будущее взаимодействия с технологиями уже здесь.
            </p>

            <div className="hero-cta-chatgpt">
              <button
                className="primary-button-chatgpt"
                onClick={() => setIsProcessModalOpen(true)}
              >
                Процесс договора
              </button>
              <button className="secondary-button-chatgpt">
                Узнать больше
              </button>
            </div>

            <div className="hero-features-chatgpt">
              <div className="feature-item-chatgpt">
                <div className="feature-icon-chatgpt">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Современный дизайн</span>
              </div>
              <div className="feature-item-chatgpt">
                <div className="feature-icon-chatgpt">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Высокая производительность</span>
              </div>
              <div className="feature-item-chatgpt">
                <div className="feature-icon-chatgpt">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>ИИ интеграция</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-chatgpt">
            <div className="partnerships-slider-chatgpt">
              <div className="slider-header-chatgpt">
                <h3 className="slider-title-chatgpt">Наши сотрудничества</h3>
                <div className="slider-indicators-chatgpt">
                  {partnerships.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator-dot-chatgpt ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>

              <div className="slider-content-chatgpt">
                <div
                  className="slides-container-chatgpt"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {partnerships.map((partnership, index) => (
                    <div key={index} className="slide-chatgpt">
                      <div
                        className="project-card-chatgpt"
                        style={{ background: partnership.gradient }}
                      >
                        <div className="project-info-chatgpt">
                          <h4 className="project-name-chatgpt">{partnership.name}</h4>
                          <p className="project-description-chatgpt">{partnership.description}</p>
                          <div className="project-tech-chatgpt">{partnership.tech}</div>
                        </div>
                        <div className="project-icon-chatgpt">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M9 9h.01M15 9h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="slider-progress-chatgpt">
                <div
                  className="progress-bar-chatgpt"
                  style={{ width: `${((currentSlide + 1) / partnerships.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно процесса договора */}
      {isProcessModalOpen && (
        <div className="modal-overlay-chatgpt" onClick={() => setIsProcessModalOpen(false)}>
          <div className="modal-content-chatgpt" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-chatgpt">
              <h2>Процесс работы с нами</h2>
              <button
                className="modal-close-chatgpt"
                onClick={() => setIsProcessModalOpen(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="modal-body-chatgpt">
              <div className="process-step-chatgpt">
                <div className="step-number-chatgpt">1</div>
                <div className="step-content-chatgpt">
                  <h3>Создание макета</h3>
                  <p>Сначала мы создаем детальный макет вашего проекта. Это включает в себя дизайн всех страниц, структуру сайта и техническое задание. На этом этапе вы видите как будет выглядеть конечный результат.</p>
                </div>
              </div>

              <div className="process-step-chatgpt">
                <div className="step-number-chatgpt">2</div>
                <div className="step-content-chatgpt">
                  <h3>Согласование и предоплата</h3>
                  <p>Если макет и техническое решение вас устраивает, мы заключаем договор и получаем предоплату 50 процентов от стоимости проекта. Это позволяет нам приступить к разработке с полной уверенностью.</p>
                </div>
              </div>

              <div className="process-step-chatgpt">
                <div className="step-number-chatgpt">3</div>
                <div className="step-content-chatgpt">
                  <h3>Разработка проекта</h3>
                  <p>Приступаем к программированию и созданию вашего проекта. Макет корректируется и дорабатывается в процессе работы для достижения наилучшего результата. Мы не мен��ем макет по несколько раз без весомых оснований.</p>
                </div>
              </div>

              <div className="process-step-chatgpt">
                <div className="step-number-chatgpt">4</div>
                <div className="step-content-chatgpt">
                  <h3>Тестирование и доработки</h3>
                  <p>Проводим полное тестирование функционала, проверяем адаптивность на всех устройствах, оптимизируем скорость загрузки. Исправляем выявленные ошибки и дорабатываем детали по вашим пожеланиям.</p>
                </div>
              </div>

              <div className="process-step-chatgpt">
                <div className="step-number-chatgpt">5</div>
                <div className="step-content-chatgpt">
                  <h3>Сдача проекта</h3>
                  <p>После завершения разработки и получения окончательного платежа мы передаем вам готовый проект. Предоставляем инструкции по использованию, помогаем с размещением на хостинге и даем гара��тию на исправление ошибо��.</p>
                </div>
              </div>

              <div className="process-step-chatgpt">
                <div className="step-number-chatgpt">6</div>
                <div className="step-content-chatgpt">
                  <h3>Поддержка и развитие</h3>
                  <p>Предлагаем техническую поддержку проекта, обновления и добавление новых функций. Помогаем масштабировать ваш бизнес с помощью дополнительных ИИ решений и интеграций.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .hero-section-chatgpt {
          background: #ffffff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding-top: 100px; /* Добавляем отступ для fixed navbar */
        }

        .hero-container-chatgpt {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
        }

        .hero-main-chatgpt {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          padding: 80px 0;
        }

        .hero-content-chatgpt {
          max-width: 500px;
        }

        .hero-title-chatgpt {
          font-size: 48px;
          font-weight: 600;
          line-height: 1.1;
          color: #000000;
          margin-bottom: 24px;
          position: relative;
        }

        .hero-description-chatgpt {
          font-size: 18px;
          line-height: 1.6;
          color: #666666;
          margin-bottom: 32px;
        }

        .hero-cta-chatgpt {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
        }

        .primary-button-chatgpt {
          background: #000000;
          color: #ffffff;
          border: none;
          padding: 14px 28px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .primary-button-chatgpt:hover {
          background: #333333;
        }

        .secondary-button-chatgpt {
          background: none;
          color: #000000;
          border: 1px solid #e5e5e5;
          padding: 14px 28px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .secondary-button-chatgpt:hover {
          background: #f5f5f5;
        }

        .hero-features-chatgpt {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feature-item-chatgpt {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #666666;
          font-size: 14px;
        }

        .feature-icon-chatgpt {
          width: 20px;
          height: 20px;
          color: #000000;
        }

        /* Темная тема для Hero секции */
        body.dark-theme .hero-section-chatgpt {
          background: #000000;
        }

        body.dark-theme .hero-title-chatgpt {
          color: #ffffff;
        }

        body.dark-theme .hero-description-chatgpt {
          color: #cccccc;
        }

        body.dark-theme .feature-item-chatgpt {
          color: #cccccc;
        }

        body.dark-theme .feature-icon-chatgpt {
          color: #ffffff;
        }

        body.dark-theme .primary-button-chatgpt {
          background: #ffffff;
          color: #000000;
        }

        body.dark-theme .primary-button-chatgpt:hover {
          background: #f0f0f0;
        }

        body.dark-theme .secondary-button-chatgpt {
          background: none;
          color: #ffffff;
          border-color: #555555;
        }

        body.dark-theme .secondary-button-chatgpt:hover {
          background: #333333;
        }

        body.dark-theme .partnerships-slider-chatgpt {
          background: #111111;
          border-color: #333333;
        }

        body.dark-theme .slider-title-chatgpt {
          color: #ffffff;
        }

        body.dark-theme .project-name-chatgpt {
          color: #ffffff;
        }

        body.dark-theme .project-description-chatgpt {
          color: rgba(255, 255, 255, 0.9);
        }

        body.dark-theme .project-tech-chatgpt {
          color: rgba(255, 255, 255, 0.8);
        }

        body.dark-theme .indicator-dot-chatgpt {
          background: #555555;
        }

        body.dark-theme .indicator-dot-chatgpt.active {
          background: #ffffff;
        }

        body.dark-theme .progress-bar-chatgpt {
          background: #ffffff;
        }

        body.dark-theme .modal-content-chatgpt {
          background: #111111;
          color: #ffffff;
        }

        body.dark-theme .modal-header-chatgpt {
          border-bottom: 1px solid #333333;
        }

        body.dark-theme .modal-header-chatgpt h2 {
          color: #ffffff;
        }

        body.dark-theme .modal-close-chatgpt {
          color: #cccccc;
        }

        body.dark-theme .modal-close-chatgpt:hover {
          background: #333333;
          color: #ffffff;
        }

        body.dark-theme .step-number-chatgpt {
          background: #ffffff;
          color: #000000;
        }

        body.dark-theme .step-content-chatgpt h3 {
          color: #ffffff;
        }

        body.dark-theme .step-content-chatgpt p {
          color: #cccccc;
        }

        .hero-visual-chatgpt {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .chat-interface-chatgpt {
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .chat-header-chatgpt {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #e5e5e5;
        }

        .chat-title-chatgpt {
          font-weight: 600;
          color: #000000;
        }

        .chat-status-chatgpt {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #666666;
        }

        .status-dot-chatgpt {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
        }

        .chat-messages-chatgpt {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: 300px;
        }

        .message-chatgpt {
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }

        .user-message-chatgpt {
          justify-content: flex-end;
        }

        .user-message-chatgpt .message-bubble-chatgpt {
          background: #000000;
          color: #ffffff;
          max-width: 80%;
        }

        .ai-message-chatgpt {
          justify-content: flex-start;
        }

        .ai-message-chatgpt .message-bubble-chatgpt {
          background: #f5f5f5;
          color: #000000;
          max-width: 80%;
        }

        .ai-avatar-chatgpt {
          width: 24px;
          height: 24px;
          background: #000000;
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .message-bubble-chatgpt {
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.4;
        }

        .typing-indicator-chatgpt {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .typing-dots-chatgpt {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
          background: #f5f5f5;
          border-radius: 18px;
        }

        .typing-dots-chatgpt span {
          width: 6px;
          height: 6px;
          background: #999999;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .typing-dots-chatgpt span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-dots-chatgpt span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        /* Модальное окно */
        .modal-overlay-chatgpt {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          backdrop-filter: blur(4px);
        }

        .modal-content-chatgpt {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 700px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .modal-header-chatgpt {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 32px;
          border-bottom: 1px solid #e5e5e5;
        }

        .modal-header-chatgpt h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          color: #000000;
        }

        .modal-close-chatgpt {
          background: none;
          border: none;
          color: #666666;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .modal-close-chatgpt:hover {
          background: #f5f5f5;
          color: #000000;
        }

        .modal-body-chatgpt {
          padding: 32px;
        }

        .process-step-chatgpt {
          display: flex;
          gap: 20px;
          margin-bottom: 32px;
          align-items: flex-start;
        }

        .step-number-chatgpt {
          width: 40px;
          height: 40px;
          background: #000000;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 16px;
          flex-shrink: 0;
        }

        .step-content-chatgpt {
          flex: 1;
        }

        .step-content-chatgpt h3 {
          margin: 0 0 12px 0;
          font-size: 18px;
          font-weight: 600;
          color: #000000;
        }

        .step-content-chatgpt p {
          margin: 0;
          font-size: 15px;
          line-height: 1.6;
          color: #666666;
        }


        @media (max-width: 768px) {
          .hero-section-chatgpt {
            padding-top: 80px;
          }

          .hero-main-chatgpt {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 40px 0;
          }

          .hero-title-chatgpt {
            font-size: 32px;
          }

          .hero-cta-chatgpt {
            flex-direction: column;
          }

          .chat-interface-chatgpt {
            max-width: 100%;
          }

          .modal-content-chatgpt {
            margin: 10px;
            max-height: 95vh;
          }

          .modal-header-chatgpt {
            padding: 20px;
          }

          .modal-body-chatgpt {
            padding: 20px;
          }

          .process-step-chatgpt {
            gap: 16px;
            margin-bottom: 24px;
          }

          .step-number-chatgpt {
            width: 32px;
            height: 32px;
            font-size: 14px;
          }

        }
      `}</style>
    </section>
  )
}
