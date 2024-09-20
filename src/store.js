import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
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
   * Добавление в корзину
   */
  addItem(code) {
    const item = this.state.list.find(i => i.code === code);
    const basketItem = this.state.basketList.find(i => i.code === code);

    if (basketItem) {
      this.setState({
        ...this.state,
        basketList: this.state.basketList.map(i =>i.code === code ? { ...i, count: i.count + 1 } : i),
        basketListSum: this.state.basketListSum + item.price, //this.state.basketList.reduce((sum, item) => sum + (item.count*item.price), 0)
      });
    } else {
      this.setState({
        ...this.state,
        basketList: [...this.state.basketList, { ...item, count: 1 }],
        basketListSum: this.state.basketListSum + item.price,//this.state.basketList.reduce((sum, item) => sum + (item.count*item.price), 0)
      });
    }  
      
  }

  /**
   * Удаление из корзины
   * @param code
   */
  deleteItem(code) {
    const item = this.state.basketList.find(i => i.code === code);
    //console.log(item.count)
    this.setState({
      ...this.state,
      basketList: (item.count > 1) ? this.state.basketList.map(i =>i.code === code ? { ...i, count: i.count - 1 } : i) : this.state.basketList.filter((i) => i.code !== code),
      basketListSum: this.state.basketListSum - item.price
    });
    //console.log(this.state.basketList)
  }

}

export default Store;
