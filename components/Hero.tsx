import { useState } from 'react'

export default function Hero() {
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false)

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
              Мы объединяем креативность дизайна с мощью искусственного интеллекта для создания веб-сайтов и приложений нового уровня.
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
            <div className="chat-interface-chatgpt">
              <div className="chat-header-chatgpt">
                <div className="chat-title-chatgpt">JARVIS AI</div>
                <div className="chat-status-chatgpt">
                  <div className="status-dot-chatgpt"></div>
                  Онлайн
                </div>
              </div>
              <div className="chat-messages-chatgpt">
                <div className="message-chatgpt user-message-chatgpt">
                  <div className="message-bubble-chatgpt">
                    Создай современный веб-сайт с ИИ функциями
                  </div>
                </div>
                <div className="message-chatgpt ai-message-chatgpt">
                  <div className="ai-avatar-chatgpt">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div className="message-bubble-chatgpt">
                    Отлично! Я создам для вас современный веб-сайт с интегрированными ИИ решениями. Начнем с анализа ваших требований и создания концепции дизайна.
                  </div>
                </div>
                <div className="typing-indicator-chatgpt">
                  <div className="ai-avatar-chatgpt">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div className="typing-dots-chatgpt">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        }
      `}</style>
    </section>
  )
}
