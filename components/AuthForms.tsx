import { useState } from 'react'

interface AuthFormsProps {
  onClose: () => void
  onLogin: (user: any) => void
}

export default function AuthForms({ onClose, onLogin }: AuthFormsProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Проверяем, что не обрабатываем запрос уже
    if (loading) {
      console.log('AuthForms: Request already in progress, ignoring')
      return
    }

    setLoading(true)
    setError('')

    try {
      if (!isLogin && formData.password !== formData.confirmPassword) {
        setError('Пароли не совпадают')
        setLoading(false)
        return
      }

      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const body = isLogin
        ? { email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password, name: formData.name }

      console.log('AuthForms: Making request to:', endpoint, 'with body:', body)

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      // Клонируем response для безопасного чтения
      const responseClone = response.clone()
      let data

      try {
        data = await responseClone.json()
      } catch (jsonError) {
        console.error('AuthForms: Failed to parse JSON:', jsonError)
        setError('Ошибка формата ответа сервера')
        return
      }

      if (response.ok) {
        console.log('AuthForms: Authentication successful')
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
        onLogin(data.user)
        onClose()
      } else {
        console.log('AuthForms: Authentication failed:', data.message)
        setError(data.message || 'Произошла ошибка авториза��ии')
      }
    } catch (error) {
      console.error('AuthForms: Network error:', error)
      setError('Ошибка соединения с сервером')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <div className="auth-header">
          <h2>{isLogin ? 'Вход в систему' : 'Регистрация'}</h2>
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Имя</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
                placeholder="Введите ваше имя"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Введите пароль"
              minLength={6}
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Подтвердите пароль</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required={!isLogin}
                placeholder="Повторите пароль"
                minLength={6}
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="loading-icon">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Загрузка...
              </>
            ) : isLogin ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 3H21V9M21 3L12 12M9 21H3V15M3 21L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Войти
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" strokeWidth="2"/>
                  <line x1="17" y1="11" x2="23" y2="11" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Зарегистрироваться
              </>
            )}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="switch-btn"
            >
              {isLogin ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" strokeWidth="2"/>
                    <line x1="17" y1="11" x2="23" y2="11" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Зарегистрироваться
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M15 3H21V9M21 3L12 12M9 21H3V15M3 21L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Войти
                </>
              )}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
