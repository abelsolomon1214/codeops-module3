import { useMemo, useReducer } from "react";
import CartContext from "./CartContext";
import cartReducer from "./cartReducer";

function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const addToCart = (dish) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: dish,
    });
  };

  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const value = useMemo(
    () => ({
      items,
      total,
      addToCart,
      removeFromCart,
      clearCart,
    }),
    [items, total]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;