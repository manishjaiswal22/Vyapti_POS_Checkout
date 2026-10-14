import { useState, useMemo } from 'react'
import { CartContext } from './CartContext'
import { INITIAL_CART_ITEMS } from '../data/mockItems'

export function CartProvider({ children }) {
  const [items, setItems] = useState(INITIAL_CART_ITEMS)

  const addItem = (item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.itemCode === item.itemCode)
      if (existing) {
        return prev.map((i) =>
          i.itemCode === item.itemCode ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (itemCode, qty) => {
    if (qty <= 0) {
      removeItem(itemCode)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.itemCode === itemCode ? { ...item, quantity: qty } : item
      )
    )
  }

  const removeItem = (itemCode) => {
    setItems((prev) => prev.filter((item) => item.itemCode !== itemCode))
  }

  const clearCart = () => {
    setItems([])
  }

  const summary = useMemo(() => {
    const totalItems = items.length
    const subTotal = items.reduce((sum, item) => sum + item.mrp * item.quantity, 0)
    const grandTotal = subTotal

    return {
      totalItems,
      subTotal,
      grandTotal,
    }
  }, [items])

  return (
    <CartContext.Provider
      value={{
        items,
        summary,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
