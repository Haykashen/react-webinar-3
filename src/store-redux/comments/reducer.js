export const initialState = {
    items: [],
    count: 0,
    waiting: false,
    error: ''
  };
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case 'comments/load-start': return { ...state, items: [], waiting: true };
      case 'comments/load-success': {
        const { items, count } = action.payload;
        return { ...state, items, count, waiting: false, error: '' };
      }
      case 'comments/load-error':
        return { ...state, items: [], waiting: false, error: 'Ошибка загрузки комментариев' };
      case 'comments/add-success': {
        const count = state.count + 1;
        const items = [...state.items, action.payload];
        return { ...state, items, count, waiting: false, error: '' };
      }
      case 'comments/add-error':
        return { ...state, waiting: false, error: 'Ошибка добавления комментария' };
      default: return state;
    }
  }
  
  export default reducer;