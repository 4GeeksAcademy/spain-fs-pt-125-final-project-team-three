export const initialStore = () => {
  return {
    filtros: { halal: false, vegano: false, celiaco: false },
    misFavoritos: [],
    yaVisitados: [], 
    radius: 5000
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_filters':
      return { ...store, filtros: action.payload };

    case 'set_radius':
      return { ...store, radius: action.payload };

    case 'agregar_favorito':
      if (store.misFavoritos.some(f => f.nombre === action.payload.nombre)) return store;
      return { ...store, misFavoritos: [...store.misFavoritos, action.payload] };

    case 'agregar_visitado':
      if (store.yaVisitados.some(v => v.nombre === action.payload.nombre)) return store;
      return { ...store, yaVisitados: [...store.yaVisitados, action.payload] };

    case 'borrar_favorito':
      return { 
        ...store, 
        misFavoritos: store.misFavoritos.filter(item => item.nombre !== action.payload) 
      };

    case 'borrar_visitado':
      return { 
        ...store, 
        yaVisitados: store.yaVisitados.filter(item => item.nombre !== action.payload) 
      };

    default:
      return store;
  }
}