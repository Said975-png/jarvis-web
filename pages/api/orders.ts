import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const ordersFilePath = path.join(process.cwd(), 'data', 'orders.json')

// Убеждаемся, что файл существует
function ensureOrdersFile() {
  try {
    if (!fs.existsSync(ordersFilePath)) {
      const dataDir = path.dirname(ordersFilePath)
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }
      fs.writeFileSync(ordersFilePath, JSON.stringify([]))
    }
  } catch (error) {
    console.error('Error ensuring orders file:', error)
  }
}

function getOrders() {
  try {
    ensureOrdersFile()
    const data = fs.readFileSync(ordersFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading orders:', error)
    return []
  }
}

function saveOrders(orders: any[]) {
  try {
    ensureOrdersFile()
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2))
  } catch (error) {
    console.error('Error saving orders:', error)
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const orders = getOrders()
      res.status(200).json(orders)
    } catch (error) {
      res.status(500).json({ error: 'Failed to get orders' })
    }
  } else if (req.method === 'POST') {
    try {
      const orders = getOrders()
      const newOrder = req.body
      orders.push(newOrder)
      saveOrders(orders)
      res.status(201).json(newOrder)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create order' })
    }
  } else if (req.method === 'PUT') {
    try {
      const { orderId, status } = req.body
      const orders = getOrders()
      const orderIndex = orders.findIndex((order: any) => order.id === orderId)
      
      if (orderIndex === -1) {
        return res.status(404).json({ error: 'Order not found' })
      }

      orders[orderIndex].status = status
      orders[orderIndex].updatedAt = new Date().toISOString()
      saveOrders(orders)
      
      res.status(200).json(orders[orderIndex])
    } catch (error) {
      res.status(500).json({ error: 'Failed to update order' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
