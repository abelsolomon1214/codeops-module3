
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
};

type Dish = Omit<CartItem, "quantity">;

type CartContextType = {
  cartItems: CartItem[];
  isLoaded: boolean;
  addToCart: (dish: Dish) => void;
  removeFromCart: (dishId: number) => void;
  updateQuantity: (dishId: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "addis-eats-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load the saved cart after mounting, then update state asynchronously.
  useEffect(() => {
    let cancelled = false;

    const loadCart = async () => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);

        if (savedCart) {
          const parsedCart: unknown = JSON.parse(savedCart);

          if (Array.isArray(parsedCart) && !cancelled) {
            setCartItems(parsedCart);
          }
        }
      } catch {
        localStorage.removeItem(CART_STORAGE_KEY);
      } finally {
        if (!cancelled) {
          setIsLoaded(true);
        }
      }
    };

    void loadCart();

    return () => {
      cancelled = true;
    };
  }, []);

  // Save changes only after the initial cart has loaded.
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems, isLoaded]);

  const addToCart = useCallback((dish: Dish) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === dish.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { ...dish, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((dishId: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== dishId),
    );
  }, []);

  const updateQuantity = useCallback(
    (dishId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(dishId);
        return;
      }

      setCartItems((currentItems) =>
        currentItems.map((item) =>
          item.id === dishId ? { ...item, quantity } : item,
        ),
      );
    },
    [removeFromCart],
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoaded,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}
