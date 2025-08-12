import Head from 'next/head'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Страница не найдена - JARVIS</title>
      </Head>
      
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: '#f7f7f8'
      }}>
        <h1 style={{ fontSize: '4rem', margin: 0, color: '#0066cc' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', margin: '1rem 0', color: '#333' }}>
          Страница не найдена
        </h2>
        <p style={{ color: '#666', textAlign: 'center', maxWidth: '400px' }}>
          Извините, запрашиваемая стра��ица не существует или была перемещена.
        </p>
        <a 
          href="/" 
          style={{
            marginTop: '2rem',
            padding: '12px 24px',
            backgroundColor: '#0066cc',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '500'
          }}
        >
          Вернуться на главную
        </a>
      </div>
    </>
  )
}
