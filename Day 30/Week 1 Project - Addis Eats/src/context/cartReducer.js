export function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const existingItem = state.items.find(
        (item) => item.id === action.dish.id,
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.dish.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.dish,
            quantity: 1,
          },
        ],
      };
    }

    case "remove": {
      const existingItem = state.items.find(
        (item) => item.id === action.id,
      );

      if (!existingItem) {
        return state;
      }

      if (existingItem.quantity === 1) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.id !== action.id,
          ),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      };
    }

    case "clear":
      return {
        ...state,
        items: [],
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}