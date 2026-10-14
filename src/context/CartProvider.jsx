import { useState, useMemo } from 'react'
import { CartContext } from './CartContext'

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = (item) => {
    const key = item.id || (item.size ? `${item.itemCode}_${item.size}` : item.itemCode)
    const addQty = item.quantity || 1

    setItems((prev) => {
      const existing = prev.find((i) => (i.id || i.itemCode) === key)
      if (existing) {
        return prev.map((i) =>
          (i.id || i.itemCode) === key
            ? {
                ...i,
                quantity: i.quantity + addQty,
                epcs: [...(i.epcs || []), ...(item.epcs || [item.epc].filter(Boolean))],
              }
            : i
        )
      }
      return [
        ...prev,
        {
          ...item,
          id: key,
          quantity: addQty,
          epcs: item.epcs || (item.epc ? [item.epc] : []),
        },
      ]
    })
  }

  const updateQuantity = (key, qty) => {
    if (qty <= 0) {
      removeItem(key)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        (item.id || item.itemCode) === key ? { ...item, quantity: qty } : item
      )
    )
  }

  const removeItem = (key) => {
    setItems((prev) => prev.filter((item) => (item.id || item.itemCode) !== key))
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
