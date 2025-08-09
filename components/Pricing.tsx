export default function Pricing() {
  return (
    <section className="pricing-section">
      <div className="pricing-container">
        <h2 className="pricing-title">Наши тарифы</h2>
        
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>BASIC</h3>
            <div className="price">2.500.000 сумм</div>
            <button className="order-btn">Заказать</button>
          </div>

          <div className="pricing-card">
            <h3>PRO</h3>
            <div className="price">4.000.000 сумм</div>
            <button className="order-btn">Заказать</button>
          </div>

          <div className="pricing-card">
            <h3>MAX</h3>
            <div className="price">5.000.000 сумм</div>
            <button className="order-btn">Заказать</button>
          </div>
        </div>
      </div>
    </section>
  )
}
