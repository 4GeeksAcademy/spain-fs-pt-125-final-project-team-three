export const initialStore = () => {
  return {
    radius: 5000
  };
};

export const storeReducer = (state, action) => {
  switch (action.type) {

    case "set_radius":
      return {
        ...state,
        radius: action.payload
      };

    default:
      return state;
  }
};

export default storeReducer;