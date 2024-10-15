// Начальное состояние
export const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: {}, waiting: true };

    case 'comments/load-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'comments/load-error':
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранять?

    case 'comments/set-reply-to':
        return { ...state, replyTo: action.payload };
  
    case 'comments/clear-reply-to':
        return { ...state, replyTo: null };
  
    case 'comments/add-start':
        return { ...state};
  
    case 'comments/add-success':
        return produce(state, draft => {
          draft.data.push(action.payload);
          draft.data.sort(
            (a, b) => new Date(a.dateCreate) - new Date(b.dateCreate)
          );
        });
  
      case 'comments/add-error':
        return { ...state};
    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
