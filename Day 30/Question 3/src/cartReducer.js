function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.item];

    case "remove":
      return state.filter((item) => item.id !== action.id);

    case "clear":
      return [];

    default:
      return state;
  }
}

export default cartReducer;