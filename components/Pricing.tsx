import { useState, useEffect } from 'react'

export default function Pricing() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="pricing-section">
      <div className="pricing-container">
        <div className="pricing-main">
          <div className="pricing-content">
            <div className="pricing-badge">
              <div className="badge-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L14 8H21L16 12L18 19L12 15L6 19L8 12L3 8H10L12 2Z" fill="currentColor"/>
                </svg>
              </div>
              Прозрачные цены
            </div>

            <h2 className="pricing-title">
              Честные <span className="title-highlight">цены</span><br />
              без скрытых платежей
            </h2>

            <p className="pricing-description">
              Выберите план, который подходит именно вашему бизнесу. 
              Все цены фиксированные, никаких доплат или скрытых комиссий. 
              Полная прозрачность и максимальная выгода для вашего проекта.
            </p>
          </div>

          <div className="pricing-cards">
            <div className="pricing-card">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="card-content">
                <h3>BASIC Plan</h3>
                <div className="price">2.500.000 сумм</div>
                <p>Стартовый пакет для небольших проектов</p>
                <button className="order-btn">Заказать</button>
              </div>
            </div>

            <div className="pricing-card featured">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L14 8H21L16 12L18 19L12 15L6 19L8 12L3 8H10L12 2Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="card-content">
                <h3>PRO Plan</h3>
                <div className="price">4.000.000 сумм</div>
                <p>Лучший выбор для бизнеса</p>
                <button className="order-btn">Заказать</button>
              </div>
            </div>

            <div className="pricing-card">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L14.59 8.36L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L9.41 8.36L12 2Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="card-content">
                <h3>MAX Plan</h3>
                <div className="price">5.000.000 сумм</div>
                <p>Максимум возможностей</p>
                <button className="order-btn">Заказать</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
