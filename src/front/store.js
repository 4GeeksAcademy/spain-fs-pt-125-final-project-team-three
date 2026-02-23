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

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_filters':
      return {
        ...store,
        filtros: action.payload
      };

    default:
      throw Error('Unknown action.');
  }
}