export default function Process() {
  return (
    <section className="process-section">
      {/* Background Decorative Elements */}
      <div className="bg-decoration">
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
        <div className="grid-pattern" />

        {/* Decorative Crosses */}
        <div className="floating-cross cross-1">✕</div>
        <div className="floating-cross cross-2">✕</div>
        <div className="floating-cross cross-3">✕</div>
        <div className="floating-cross cross-4">✕</div>
      </div>

      <div className="process-container">
        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">01</div>
            <div className="step-content">
              <h4 className="step-title">Анализ сайта</h4>
              <p className="step-description">
                Изучаем ��труктуру каталога и особенности бизнеса
              </p>
            </div>
          </div>

          <div className="process-step">
            <div className="step-number">02</div>
            <div className="step-content">
              <h4 className="step-title">Настройка ИИ</h4>
              <p className="step-description">
                Обучаем систему на ваших данных и товарах
              </p>
            </div>
          </div>

          <div className="process-step">
            <div className="step-number">03</div>
            <div className="step-content">
              <h4 className="step-title">Интеграция</h4>
              <p className="step-description">
                Встраиваем Джарвис в ваш сайт одной строкой кода
              </p>
            </div>
          </div>

          <div className="process-step">
            <div className="step-number">04</div>
            <div className="step-content">
              <h4 className="step-title">Запуск</h4>
              <p className="step-description">
                Система готова к работе и начинает помогать кли��нтам
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
