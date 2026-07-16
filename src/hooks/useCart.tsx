"use client"

import { createContext, useContext, useReducer, useCallback, type ReactNode } from "react"
import { toast } from "sonner"

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  size: string
  color: string
  discount: number | null
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "SET_ITEMS"; payload: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      )
      if (existingIndex >= 0) {
        const newItems = [...state.items]
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + 1,
        }
        return { ...state, items: newItems }
      }
      return { ...state, items: [...state.items, action.payload] }
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }
    case "CLEAR_CART":
      return { ...state, items: [] }
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen }
    case "SET_ITEMS":
      return { ...state, items: action.payload }
    default:
      return state
  }
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  itemCount: number
  subtotal: number
  totalDiscount: number
  addItem: (item: Omit<CartItem, "id">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  })

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const totalDiscount = state.items.reduce(
    (sum, item) =>
      sum + (item.discount || 0) * item.price * item.quantity * 0.01,
    0
  )

  const addItem = useCallback(
    (item: Omit<CartItem, "id">) => {
      const id = `${item.productId}-${item.size}-${item.color}-${Date.now()}`
      dispatch({ type: "ADD_ITEM", payload: { ...item, id } })
      toast.success("Added to cart", {
        description: `${item.name} (${item.size}) has been added to your cart.`,
      })
    },
    []
  )

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
    toast.success("Removed from cart")
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" })
  }, [])

  const toggleCart = useCallback(() => {
    dispatch({ type: "TOGGLE_CART" })
  }, [])

  const setOpen = useCallback((open: boolean) => {
    if (open !== state.isOpen) {
      dispatch({ type: "TOGGLE_CART" })
    }
  }, [state.isOpen])

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        itemCount,
        subtotal,
        totalDiscount,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        setOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
