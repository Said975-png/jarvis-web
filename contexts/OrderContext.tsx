import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem } from './CartContext'

export interface OrderFormData {
  fullName: string
  phone: string
  description: string
  referenceUrl?: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  formData: OrderFormData
  totalPrice: number
  status: 'pending' | 'confirmed' | 'rejected'
  createdAt: string
  updatedAt: string
}

interface OrderContextType {
  orders: Order[]
  isLoading: boolean
  createOrder: (items: CartItem[], formData: OrderFormData, userId: string) => Promise<Order>
  updateOrderStatus: (orderId: string, status: 'confirmed' | 'rejected') => Promise<void>
  getUserOrders: (userId: string) => Order[]
  getAllOrders: () => Order[]
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Загружаем заказы при инициализации
  useEffect(() => {
    // Проверяем что мы на клиенте
    if (typeof window === 'undefined') {
      setIsLoading(false)
      return
    }

    const loadOrders = async () => {
      try {
        const response = await fetch('/api/orders')
        if (response.ok) {
          const loadedOrders = await response.json()
          setOrders(loadedOrders)
        } else {
          console.warn('Failed to load orders, using empty state')
        }
      } catch (error) {
        console.error('Error loading orders:', error)
        // Не показываем ошибку пользователю, просто используем пустой массив
      } finally {
        setIsLoading(false)
      }
    }

    loadOrders()
  }, [])

  const createOrder = async (items: CartItem[], formData: OrderFormData, userId: string): Promise<Order> => {
    const totalPrice = items.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/\D/g, '')) || 0
      return total + (price * item.quantity)
    }, 0)

    const newOrder: Order = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      items,
      formData,
      totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Отправляем на API (только на клиенте)
    if (typeof window !== 'undefined') {
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newOrder),
        })

        if (response.ok) {
          const savedOrder = await response.json()
          setOrders(prev => [...prev, savedOrder])
          return savedOrder
        } else {
          console.warn('Failed to create order on server, saving locally')
        }
      } catch (error) {
        console.error('Error creating order:', error)
        // Fallback: сохраняем локально
      }
    }

    // Fallback или серверный рендеринг: сохраняем локально
    setOrders(prev => [...prev, newOrder])
    return newOrder
  }

  const updateOrderStatus = async (orderId: string, status: 'confirmed' | 'rejected'): Promise<void> => {
    // Обновляем локально сразу для отзывчивости UI
    setOrders(prev => prev.map(order =>
      order.id === orderId
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    ))

    // Пытаемся синхронизировать с сервером (только на клиенте)
    if (typeof window !== 'undefined') {
      try {
        const response = await fetch('/api/orders', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId, status }),
        })

        if (!response.ok) {
          console.warn('Failed to update order status on server')
        }
      } catch (error) {
        console.error('Error updating order status:', error)
        // Локальное состояние уже обновлено, поэтому не требуется дополнительных действий
      }
    }
  }

  const getUserOrders = (userId: string): Order[] => {
    return orders.filter(order => order.userId === userId)
  }

  const getAllOrders = (): Order[] => {
    return orders
  }

  return (
    <OrderContext.Provider value={{
      orders,
      isLoading,
      createOrder,
      updateOrderStatus,
      getUserOrders,
      getAllOrders
    }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  return context
}
