"use client"

import React, { createContext, useContext, useReducer, useCallback, type ReactNode } from "react"
import { toast } from "sonner"

interface WishlistItem {
  productId: string
  name: string
  price: number
  image: string
  discount: number | null
}

interface WishlistState {
  items: WishlistItem[]
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "SET_ITEMS"; payload: WishlistItem[] }

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "ADD_ITEM":
      if (state.items.some((item) => item.productId === action.payload.productId)) {
        return state
      }
      return { ...state, items: [...state.items, action.payload] }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.productId !== action.payload),
      }
    case "SET_ITEMS":
      return { ...state, items: action.payload }
    default:
      return state
  }
}

interface WishlistContextType {
  items: WishlistItem[]
  isInWishlist: (productId: string) => boolean
  addItem: (item: WishlistItem) => void
  removeItem: (productId: string) => void
  toggleItem: (item: WishlistItem) => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] })

  const isInWishlist = useCallback(
    (productId: string) => state.items.some((item) => item.productId === productId),
    [state.items]
  )

  const addItem = useCallback((item: WishlistItem) => {
    dispatch({ type: "ADD_ITEM", payload: item })
    toast.success("Added to wishlist", {
      description: `${item.name} has been added to your wishlist.`,
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId })
    toast.success("Removed from wishlist")
  }, [])

  const toggleItem = useCallback(
    (item: WishlistItem) => {
      if (isInWishlist(item.productId)) {
        removeItem(item.productId)
      } else {
        addItem(item)
      }
    },
    [isInWishlist, addItem, removeItem]
  )

  return (
    <WishlistContext.Provider
      value={{ items: state.items, isInWishlist, addItem, removeItem, toggleItem }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }

  return context
}
