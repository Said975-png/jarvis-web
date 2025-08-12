import Head from 'next/head'
import styles from '../styles/mockup.module.css'

export async function getServerSideProps() {
  return {
    props: {},
  }
}

export default function MockupPage() {
  return (
    <>
      <Head>
        <title>JARVIS Website Mockup - Laptop Design</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.mockupContainer}>
        {/* Пер��вернутый ноутбук */}
        <div className={styles.laptopMockup}>
          {/* Экран ноутбука */}
          <div className={styles.laptopScreen}>
            <div className={styles.screenFrame}>
              <div className={styles.screenBezel}>
                {/* Камера */}
                <div className={styles.camera}></div>
                
                {/* Контент сайта в экране */}
                <iframe
                  src="https://e6782ded15924ae6ac15a4317ec41fb3-751065517e0f460887f9a06b2.fly.dev/"
                  className={styles.websiteContent}
                  title="JARVIS Website"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Клавиатура и основание ноутбука */}
          <div className={styles.laptopBase}>
            <div className={styles.keyboardArea}>
              {/* Клавиатура */}
              <div className={styles.keyboard}>
                {/* Ряды клавиш */}
                <div className={styles.keyRow}>
                  {[...Array(13)].map((_, i) => (
                    <div key={i} className={styles.key}></div>
                  ))}
                </div>
                <div className={styles.keyRow}>
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={styles.key}></div>
                  ))}
                </div>
                <div className={styles.keyRow}>
                  {[...Array(11)].map((_, i) => (
                    <div key={i} className={styles.key}></div>
                  ))}
                </div>
                <div className={styles.keyRow}>
                  <div className={`${styles.key} ${styles.shiftKey}`}></div>
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={styles.key}></div>
                  ))}
                  <div className={`${styles.key} ${styles.shiftKey}`}></div>
                </div>
                <div className={`${styles.keyRow} ${styles.spaceRow}`}>
                  <div className={`${styles.key} ${styles.ctrlKey}`}></div>
                  <div className={`${styles.key} ${styles.altKey}`}></div>
                  <div className={`${styles.key} ${styles.spaceKey}`}></div>
                  <div className={`${styles.key} ${styles.altKey}`}></div>
                  <div className={`${styles.key} ${styles.ctrlKey}`}></div>
                </div>
              </div>

              {/* Тачпад */}
              <div className={styles.trackpad}>
                <div className={styles.trackpadSurface}></div>
              </div>
            </div>

            {/* Логотип бренда */}
            <div className={styles.brandLogo}>
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2Fb9756cc334164143a08add8073145880%2Ff677b712e9264dbf9c624260059e0bc2?format=webp&width=800"
                alt="JARVIS Logo"
                className={styles.logoImage}
              />
              <span className={styles.brandText}>JARVIS</span>
            </div>
          </div>
        </div>

        {/* Тень ноутбука */}
        <div className={styles.laptopShadow}></div>

        {/* Кнопка скачивания */}
        <button className={styles.downloadBtn} onClick={() => window.print()}>
          📸 Скачать макет
        </button>
      </div>
    </>
  )
}
