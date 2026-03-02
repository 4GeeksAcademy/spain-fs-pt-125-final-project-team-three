export const initialStore = () => {
  return {
    misFavoritos: [],
    yaVisitados: [],
    guardados: [],
    descartados: [],
    radius: 5000,
    restaurantes: []
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

    case 'borrar_favorito':
      return { ...store, misFavoritos: store.misFavoritos.filter(item => item.nombre !== action.payload) };

    case 'agregar_visitado':
      if (store.yaVisitados.some(v => v.nombre === action.payload.nombre)) return store;
      return { ...store, yaVisitados: [...store.yaVisitados, action.payload] };

    case 'borrar_visitado':
      return { ...store, yaVisitados: store.yaVisitados.filter(item => item.nombre !== action.payload) };

    case 'agregar_guardado':
      if (store.guardados.some(g => g.nombre === action.payload.nombre)) return store;
      return { ...store, guardados: [...store.guardados, action.payload] };

    case 'borrar_guardado':
      return { ...store, guardados: store.guardados.filter(item => item.nombre !== action.payload) };

    case 'agregar_descartado':
      if (store.descartados.some(d => d.nombre === action.payload.nombre)) return store;
      return { ...store, descartados: [...store.descartados, action.payload] };

    case 'borrar_descartado':
      return { ...store, descartados: store.descartados.filter(item => item.nombre !== action.payload) };

    default:
      return store;
  }
}