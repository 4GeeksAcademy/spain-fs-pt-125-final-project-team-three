export const initialStore = () => {
  return {
    // Solo dejamos lo que TU proyecto usa
    filtros: {
      halal: false,
      vegano: false,
      celiaco: false
    }
  }
}

export const storeReducer = (state, action) => {
    switch (action.type) {

        case "set_radius":
            return {
                ...state,
                radius: action.payload
            };

        default:
            throw new Error("Unknown action.");
    }
};

export default storeReducer