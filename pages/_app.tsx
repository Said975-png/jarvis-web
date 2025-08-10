import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { AuthProvider } from '../contexts/AuthContext'
import { CartProvider } from '../contexts/CartContext'
import { OrderProvider } from '../contexts/OrderContext'
import CodeProtection from '../components/CodeProtection'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <CodeProtection />
          <Component {...pageProps} />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  )
}
