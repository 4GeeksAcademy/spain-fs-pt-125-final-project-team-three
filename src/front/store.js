export const initialStore = () => {
  return {
    filtros: {
      halal: false,
      vegano: false,
      celiaco: false
    },
    misFavoritos: [],
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

    case 'agregar_favorito':
      return {
        ...state,
        misFavoritos: [...state.misFavoritos, action.payload]
      };

    case 'borrar_favorito':
      return {
        ...state,
        misFavoritos: state.misFavoritos.filter(item => item.nombre !== action.payload)
      };

    default:
      return state;
  }
};

export default storeReducer;