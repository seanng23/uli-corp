"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { type CartItem, getCart, saveCart, addToCart as addItem, removeFromCart as removeItem, updateQuantity as updateQty, clearCart as clear } from "@/lib/cart-store";

type CartContextType = {
  items: CartItem[];
  count: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  count: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const addToCart = (item: CartItem) => {
    const updated = addItem(item);
    setItems([...updated]);
  };

  const removeFromCart = (id: string) => {
    const updated = removeItem(id);
    setItems([...updated]);
  };

  const updateQuantity = (id: string, quantity: number) => {
    const updated = updateQty(id, quantity);
    setItems([...updated]);
  };

  const clearCart = () => {
    clear();
    setItems([]);
  };

  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, count, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
