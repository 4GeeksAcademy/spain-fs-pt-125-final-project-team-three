export const initialStore = () => {
  return {
    filtros: {
      halal: false,
      vegano: false,
      celiaco: false
    },
    misFavoritos: [] 
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_filters':
      return {
        ...store,
        filtros: action.payload
      };

    case 'agregar_favorito':
      return {
        ...store,
        misFavoritos: [...store.misFavoritos, action.payload]
      };

    case 'borrar_favorito':
      return {
        ...store,
        misFavoritos: store.misFavoritos.filter(item => item.nombre !== action.payload)
      };

    default:
      return store;
  }
}