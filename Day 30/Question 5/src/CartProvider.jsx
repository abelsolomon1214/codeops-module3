import { useMemo, useReducer } from "react";
import CartContext from "./CartContext";
import cartReducer from "./cartReducer";

const initialCart = [
  { id: 1, name: "Shiro", price: 180 },
  { id: 2, name: "Tibs", price: 350 },
];

function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, initialCart);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, dispatch, total }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;