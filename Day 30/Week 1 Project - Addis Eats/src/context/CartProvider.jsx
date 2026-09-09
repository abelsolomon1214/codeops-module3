import { useMemo, useReducer } from "react";
import { CartContext } from "./CartContext";
import { cartReducer } from "./cartReducer";

const initialState = {
  items: [],
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState,
  );

  const itemCount = useMemo(
    () =>
      state.items.reduce(
        (count, item) => count + item.quantity,
        0,
      ),
    [state.items],
  );

  const subtotal = useMemo(
    () =>
      state.items.reduce(
        (sum, item) =>
          sum + item.price * item.quantity,
        0,
      ),
    [state.items],
  );

  const deliveryFee = subtotal > 0 ? 80 : 0;

  const total = subtotal + deliveryFee;

  const value = useMemo(
    () => ({
      items: state.items,
      dispatch,
      itemCount,
      subtotal,
      deliveryFee,
      total,
    }),
    [
      state.items,
      itemCount,
      subtotal,
      deliveryFee,
      total,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}