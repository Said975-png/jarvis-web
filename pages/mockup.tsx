import Head from 'next/head'
import '../styles/mockup.css'

export default function MockupPage() {
  return (
    <>
      <Head>
        <title>JARVIS Website Mockup - Laptop Design</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="mockup-container">
        {/* Перевернутый ноутбук */}
        <div className="laptop-mockup">
          {/* Экран ноутбука */}
          <div className="laptop-screen">
            <div className="screen-frame">
              <div className="screen-bezel">
                {/* Камера */}
                <div className="camera"></div>
                
                {/* Кон��ент сайта в экране */}
                <iframe
                  src="https://e6782ded15924ae6ac15a4317ec41fb3-751065517e0f460887f9a06b2.fly.dev/"
                  className="website-content"
                  title="JARVIS Website"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Клавиатура и основание ноутбука */}
          <div className="laptop-base">
            <div className="keyboard-area">
              {/* Клавиатура */}
              <div className="keyboard">
                {/* Ряды клавиш */}
                <div className="key-row">
                  {[...Array(13)].map((_, i) => (
                    <div key={i} className="key"></div>
                  ))}
                </div>
                <div className="key-row">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="key"></div>
                  ))}
                </div>
                <div className="key-row">
                  {[...Array(11)].map((_, i) => (
                    <div key={i} className="key"></div>
                  ))}
                </div>
                <div className="key-row">
                  <div className="key shift-key"></div>
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="key"></div>
                  ))}
                  <div className="key shift-key"></div>
                </div>
                <div className="key-row space-row">
                  <div className="key ctrl-key"></div>
                  <div className="key alt-key"></div>
                  <div className="key space-key"></div>
                  <div className="key alt-key"></div>
                  <div className="key ctrl-key"></div>
                </div>
              </div>

              {/* Тачпад */}
              <div className="trackpad">
                <div className="trackpad-surface"></div>
              </div>
            </div>

            {/* Логотип бренда */}
            <div className="brand-logo">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2Fb9756cc334164143a08add8073145880%2Ff677b712e9264dbf9c624260059e0bc2?format=webp&width=800"
                alt="JARVIS Logo"
                className="logo-image"
              />
              <span className="brand-text">JARVIS</span>
            </div>
          </div>
        </div>

        {/* Тень ноутбука */}
        <div className="laptop-shadow"></div>

        {/* Кнопка скачивания */}
        <button className="download-btn" onClick={() => window.print()}>
          📸 Скачать макет
        </button>
      </div>
    </>
  )
}
