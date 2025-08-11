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
                
                {/* Контент сайта в экране */}
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

      <style jsx>{`
        .mockup-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          position: relative;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .laptop-mockup {
          position: relative;
          transform: perspective(1000px) rotateX(180deg) rotateY(180deg);
          transform-style: preserve-3d;
        }

        .laptop-screen {
          position: relative;
          width: 500px;
          height: 320px;
          background: #1a1a1a;
          border-radius: 12px 12px 4px 4px;
          padding: 8px;
          box-shadow: 
            0 0 0 2px #333,
            0 20px 40px rgba(0, 0, 0, 0.3),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1);
          transform: translateZ(4px);
        }

        .screen-frame {
          width: 100%;
          height: 100%;
          background: #000;
          border-radius: 8px;
          position: relative;
          overflow: hidden;
        }

        .screen-bezel {
          width: 100%;
          height: 100%;
          background: #111;
          border-radius: 6px;
          padding: 12px;
          position: relative;
        }

        .camera {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background: #333;
          border-radius: 50%;
          z-index: 10;
        }

        .website-content {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 4px;
          background: white;
          transform: rotateX(180deg) rotateY(180deg);
        }

        .laptop-base {
          position: relative;
          width: 500px;
          height: 340px;
          background: linear-gradient(145deg, #e8e8e8 0%, #d1d1d1 100%);
          border-radius: 0 0 25px 25px;
          box-shadow: 
            0 0 0 2px #bbb,
            0 10px 30px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.5),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
          transform: translateZ(0px);
        }

        .keyboard-area {
          padding: 30px 40px;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .keyboard {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 12px;
          background: linear-gradient(145deg, #f0f0f0, #e0e0e0);
          border-radius: 8px;
          box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .key-row {
          display: flex;
          gap: 3px;
          justify-content: center;
        }

        .space-row {
          margin-top: 2px;
        }

        .key {
          width: 18px;
          height: 16px;
          background: linear-gradient(145deg, #fafafa, #e8e8e8);
          border-radius: 3px;
          box-shadow: 
            0 1px 2px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
          border: 1px solid #ccc;
        }

        .shift-key {
          width: 32px;
        }

        .space-key {
          width: 120px;
        }

        .ctrl-key, .alt-key {
          width: 24px;
        }

        .trackpad {
          width: 120px;
          height: 80px;
          background: linear-gradient(145deg, #f5f5f5, #e5e5e5);
          border-radius: 8px;
          padding: 4px;
          box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .trackpad-surface {
          width: 100%;
          height: 100%;
          background: linear-gradient(145deg, #f8f8f8, #efefef);
          border-radius: 6px;
        }

        .brand-logo {
          position: absolute;
          bottom: 15px;
          right: 30px;
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0.6;
        }

        .logo-image {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }

        .brand-text {
          font-size: 12px;
          font-weight: 600;
          color: #666;
          letter-spacing: 1px;
        }

        .laptop-shadow {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 100px;
          background: radial-gradient(ellipse, rgba(0, 0, 0, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(20px);
          z-index: -1;
        }

        .download-btn {
          position: fixed;
          top: 30px;
          right: 30px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .download-btn:active {
          transform: translateY(0);
        }

        /* Для печати/скриншота убираем кнопку */
        @media print {
          .download-btn {
            display: none;
          }
          
          .mockup-container {
            padding: 0;
            min-height: auto;
            height: 100vh;
          }
        }

        /* Адаптивность */
        @media (max-width: 768px) {
          .laptop-mockup {
            transform: perspective(800px) rotateX(180deg) rotateY(180deg) scale(0.7);
          }
          
          .mockup-container {
            padding: 20px 10px;
          }
        }

        @media (max-width: 480px) {
          .laptop-mockup {
            transform: perspective(600px) rotateX(180deg) rotateY(180deg) scale(0.5);
          }
        }
      `}</style>
    </>
  )
}
