/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state =  {...initState, countListItems: initState.list.length} ;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: this.state.countListItems + 1, title: 'Новая запись', selectClickCount: 0 },
      ],
      countListItems: this.state.countListItems + 1,
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      selectedItemCode: code,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
        }
        return item;
      }),
    });
  }

  setClickCount(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item =>
        (item.code === code)? { ...item, selectClickCount: item.selectClickCount + 1 }: item,
      ),
    });
  }  
}

export default Store;
