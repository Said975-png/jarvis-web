import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AuthForms from './AuthForms'
import Profile from './Profile'

export default function Hero() {
  const { user, logout, login } = useAuth()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showAuthForms, setShowAuthForms] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)

  useEffect(() => {
    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return

      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        })
        rafId = 0
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section className="hero-section">
      {/* Beautiful orb on the right side */}
      <div className="bg-decoration">
        <div
          className="hero-orb"
          style={{
            transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.06}px)`
          }}
        />
      </div>

      <div className="hero-container">
        {/* Navigation */}
        <nav className="hero-nav">
          <div className="logo">
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text">JARVIS</span>
          </div>
          <div className="nav-links">
            {user ? (
              <div className="user-menu">
                <button
                  className="user-button"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  <div className="user-avatar">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <span>{user.name}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {showUserDropdown && (
                  <div className="user-dropdown">
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setShowProfile(true)
                        setShowUserDropdown(false)
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Личный кабинет
                    </button>
                    <div className="dropdown-divider"></div>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        logout()
                        setShowUserDropdown(false)
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
              <>
                <button
                  className="nav-link auth-link"
                  onClick={() => setShowAuthForms(true)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>Вход</span>
                </button>
              </>
            )}
            <a href="#cart" className="nav-link cart-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Корзи��а</span>
              <span className="cart-count">0</span>
            </a>
          </div>
        </nav>

        {/* Main Content */}
        <div className="hero-main">
          <div className="hero-content">
            <div className="hero-badge">
              <div className="badge-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Передовые AI-технологии
            </div>

            <h1 className="hero-title">
              Создаем <span className="title-highlight">инновационные</span><br />
              веб-решения будущего
            </h1>

            <p className="hero-description">
              Мы объед��няем креативность дизайна с мощью искусственного интеллекта,
              чтобы создавать веб-сайты и приложения, которые не просто впечатл��ют,
              а ��еволюционизируют пользовательский опыт.
            </p>

            <div className="hero-features">
              <div className="feature">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4>Современный дизайн</h4>
                  <p>Уникальные UI/UX решения</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4>Высокая производительность</h4>
                  <p>Оптимизация и ��корость</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4>AI-интеграция</h4>
                  <p>Умные алгоритмы</p>
                </div>
              </div>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">200+</div>
                <div className="stat-label">Проектов реализовано</div>
              </div>
              <div className="stat">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Время работы</div>
              </div>
              <div className="stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Техподдержка</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-container">
              <div className="tech-stack">
                <div className="tech-item">
                  <div className="tech-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 9.861a2.139 2.139 0 1 0 0 4.278 2.139 2.139 0 1 0 0-4.278z" fill="currentColor"/>
                      <path d="M20.192 9.273l-2.04-2.051a1 1 0 0 0-1.414 0L12 11.96l-4.738-4.738a1 1 0 0 0-1.414 0l-2.04 2.051A1 1 0 0 0 3.5 10.586v2.828a1 1 0 0 0 .308.707l2.04 2.051a1 1 0 0 0 1.414 0L12 11.434l4.738 4.738a1 1 0 0 0 1.414 0l2.04-2.051a1 1 0 0 0 .308-.707v-2.828a1 1 0 0 0-.308-.707z" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                  </div>
                  <span>React</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Next.js</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>TypeScript</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M9 9h6v6H9z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span>Design</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2"/>
                      <polyline points="3.27,6.96 12,12.01 20.73,6.96" stroke="currentColor" strokeWidth="2"/>
                      <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <span>AI/ML</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Cloud</span>
                </div>
              </div>
              
              <div className="code-preview">
                <div className="code-header">
                  <div className="code-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="code-title">jarvis-ai.tsx</span>
                </div>
                <div className="code-content">
                  <div className="code-line">
                    <span className="line-number">01</span>
                    <span className="code-text">
                      <span className="keyword">const</span> <span className="variable">jarvis</span> = <span className="keyword">new</span> <span className="class">AIBuilder</span>()
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">02</span>
                    <span className="code-text">
                      <span className="variable">jarvis</span>.<span className="method">create</span>(<span className="string">'website'</span>)
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">03</span>
                    <span className="code-text">
                      .<span className="method">withAI</span>(<span className="boolean">true</span>)
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">04</span>
                    <span className="code-text">
                      .<span className="method">deploy</span>()
                    </span>
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
        <div className="auth-overlay">
          <div className="profile-modal">
            <div className="profile-modal-header">
              <h2>Личный кабинет</h2>
              <button
                className="close-btn"
                onClick={() => setShowProfile(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <Profile
              user={user}
              onLogout={() => {
                logout()
                setShowProfile(false)
              }}
            />
          </div>
        </div>
      )}
    </section>
  )
}
