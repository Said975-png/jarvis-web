import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AuthForms from './AuthForms'
import Profile from './Profile'

export default function Hero() {
  const { user, logout, login } = useAuth()
  const [showAuthForms, setShowAuthForms] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <section className="hero-section-chatgpt">
      <div className="hero-container-chatgpt">
        {/* Navigation */}
        <nav className="hero-nav-chatgpt">
          <div className="logo-chatgpt">
            <div className="logo-icon-chatgpt">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fb3f5046887d8470c82b60bfa8668fc6d%2F344c594fabe14ed7b0083952ee013ca1?format=webp&width=800"
                alt="JARVIS Logo"
                width="32"
                height="32"
              />
            </div>
            <span className="logo-text-chatgpt">JARVIS</span>
          </div>

          <div className="nav-links-wrapper-chatgpt">
            <button
              className="mobile-menu-toggle-chatgpt"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Открыть меню"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                ) : (
                  <>
                    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </>
                )}
              </svg>
            </button>

            <div className={`nav-links-chatgpt ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              {user ? (
                <div className="user-menu-chatgpt">
                  <button
                    className="user-button-chatgpt"
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                  >
                    <div className="user-avatar-chatgpt">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <span>{user.name}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {showUserDropdown && (
                    <div className="user-dropdown-chatgpt">
                      <button
                        className="dropdown-item-chatgpt"
                        onClick={() => {
                          setShowProfile(true)
                          setShowUserDropdown(false)
                          setMobileMenuOpen(false)
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Личный кабинет
                      </button>
                      <div className="dropdown-divider-chatgpt"></div>
                      <button
                        className="dropdown-item-chatgpt"
                        onClick={() => {
                          logout()
                          setShowUserDropdown(false)
                          setMobileMenuOpen(false)
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M16 17L21 12L16 7M21 12H9M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Выйти
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="auth-button-chatgpt"
                  onClick={() => {
                    setShowAuthForms(true)
                    setMobileMenuOpen(false)
                  }}
                >
                  Войти
                </button>
              )}
            </div>
          </div>
        </nav>

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
              <button className="primary-button-chatgpt">
                Начать проект
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

      {/* Auth Forms Modal */}
      {showAuthForms && (
        <AuthForms
          onClose={() => setShowAuthForms(false)}
          onLogin={(userData) => {
            login(userData)
            setShowAuthForms(false)
          }}
        />
      )}

      {/* Profile Modal */}
      {showProfile && user && (
        <div className="profile-overlay">
          <div className="profile-fullscreen">
            <div className="profile-background">
              <div className="profile-grid-pattern"></div>
              <div className="profile-orb profile-orb-1"></div>
              <div className="profile-orb profile-orb-2"></div>
            </div>

            <div className="profile-container">
              <div className="profile-header">
                <div className="profile-title-section">
                  <h1 className="profile-main-title">Личный кабинет</h1>
                  <p className="profile-subtitle">Добро пожаловать, {user.name}</p>
                </div>
                <button
                  className="profile-close-btn"
                  onClick={() => setShowProfile(false)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <div className="profile-content">
                <div className="profile-welcome-card">
                  <div className="profile-user-info">
                    <div className="profile-avatar">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div className="profile-user-details">
                      <h3>{user.name}</h3>
                      <p>{user.email}</p>
                    </div>
                  </div>

                  <button className="profile-logout-btn" onClick={() => {
                    logout()
                    setShowProfile(false)
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M16 17L21 12L16 7M21 12H9M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Выйти
                  </button>
                </div>

                <div className="profile-main-content">
                  <p className="profile-placeholder">Контент личного кабинета будет добавлен позже...</p>
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
        }

        .hero-container-chatgpt {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
        }

        .hero-nav-chatgpt {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid #e5e5e5;
        }

        .logo-chatgpt {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon-chatgpt {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-icon-chatgpt img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .logo-text-chatgpt {
          font-size: 20px;
          font-weight: 600;
          color: #000000;
        }

        .nav-links-wrapper-chatgpt {
          display: flex;
          align-items: center;
        }

        .mobile-menu-toggle-chatgpt {
          display: none;
          background: none;
          border: none;
          color: #000000;
          cursor: pointer;
          padding: 8px;
        }

        .nav-links-chatgpt {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .auth-button-chatgpt {
          background: #000000;
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .auth-button-chatgpt:hover {
          background: #333333;
        }

        .user-menu-chatgpt {
          position: relative;
        }

        .user-button-chatgpt {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #000000;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 8px;
          transition: background-color 0.2s ease;
        }

        .user-button-chatgpt:hover {
          background: #f5f5f5;
        }

        .user-avatar-chatgpt {
          width: 32px;
          height: 32px;
          background: #000000;
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 500;
        }

        .user-dropdown-chatgpt {
          position: absolute;
          top: 100%;
          right: 0;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          min-width: 200px;
          z-index: 100;
        }

        .dropdown-item-chatgpt {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 12px 16px;
          background: none;
          border: none;
          color: #000000;
          cursor: pointer;
          text-align: left;
          transition: background-color 0.2s ease;
        }

        .dropdown-item-chatgpt:hover {
          background: #f5f5f5;
        }

        .dropdown-divider-chatgpt {
          height: 1px;
          background: #e5e5e5;
          margin: 4px 0;
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
          .mobile-menu-toggle-chatgpt {
            display: block;
          }

          .nav-links-chatgpt {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #ffffff;
            border: 1px solid #e5e5e5;
            border-radius: 8px;
            margin-top: 8px;
            padding: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .nav-links-chatgpt.mobile-open {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
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

        .profile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .profile-fullscreen {
          background: #ffffff;
          border-radius: 12px;
          width: 90%;
          max-width: 800px;
          max-height: 90%;
          overflow: auto;
          position: relative;
        }

        .profile-container {
          padding: 32px;
        }

        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .profile-main-title {
          font-size: 28px;
          font-weight: 600;
          color: #000000;
          margin-bottom: 8px;
        }

        .profile-subtitle {
          color: #666666;
          font-size: 16px;
        }

        .profile-close-btn {
          background: none;
          border: none;
          color: #666666;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: background-color 0.2s ease;
        }

        .profile-close-btn:hover {
          background: #f5f5f5;
        }

        .profile-welcome-card {
          background: #f9f9f9;
          padding: 24px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .profile-user-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .profile-avatar {
          width: 48px;
          height: 48px;
          background: #000000;
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .profile-user-details h3 {
          margin: 0 0 4px 0;
          color: #000000;
          font-weight: 600;
        }

        .profile-user-details p {
          margin: 0;
          color: #666666;
          font-size: 14px;
        }

        .profile-logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: 1px solid #e5e5e5;
          color: #666666;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .profile-logout-btn:hover {
          background: #f5f5f5;
        }

        .profile-placeholder {
          color: #666666;
          text-align: center;
          padding: 40px 20px;
        }
      `}</style>
    </section>
  )
}
