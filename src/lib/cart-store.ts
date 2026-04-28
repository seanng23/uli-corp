"use client";

export type CartItem = {
  id: string;
  productName: string;
  category: string;
  specs: Record<string, string>;
  quantity: number;
  slug: string;
};

const CART_KEY = "uli_enquiry_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(item: CartItem): CartItem[] {
  const cart = getCart();
  const existing = cart.findIndex((i) => i.id === item.id);
  if (existing >= 0) {
    cart[existing].quantity += item.quantity;
  } else {
    cart.push(item);
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(id: string): CartItem[] {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
  return cart;
}

export function clearCart(): void {
  saveCart([]);
}

export function generateItemId(slug: string, specs: Record<string, string>): string {
  const specStr = Object.entries(specs)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join("|");
  return `${slug}__${specStr}`;
}
