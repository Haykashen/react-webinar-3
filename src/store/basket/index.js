import StoreModule from '../module';

class Basket extends StoreModule {
  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
    };
  }

  /**
   * Добавление товара в корзину
   * @param argItem Товар
   */
  addToBasket(argItem) {
  console.log(this.getState().list, this.store.getState().catalog.list)
    let sum = 0;
    let exist = false;

    // Ищем товар в корзине, чтобы увеличить его количество
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === argItem._id) {
        exist = true; // Запомним, что был найден в корзине
        result = { ...item, amount: item.amount + 1 };
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      console.log(argItem)

      // const item = this.store.getState().catalog.list.find(item => item._id === argItem._id);
      // if (!item) {
      //   console.error('Товар не найден в каталоге'); 
      //   return;
      // }
      list.push({ ...argItem, amount: 1 }); // list уже новый, в него можно пушить.
      // Добавляем к сумме.
      sum += argItem.price;
    }

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Добавление в корзину',
    );
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Удаление из корзины',
    );

    // deleteItem(code) {
    //   const item = this.state.basketList.find(i => i.code === code);
    //   //console.log(item.count)
    //   this.setState({
    //     ...this.state,
    //     basketList: (item.count > 1) ? this.state.basketList.map(i =>i.code === code ? { ...i, count: i.count - 1 } : i) : this.state.basketList.filter((i) => i.code !== code),
    //     basketListSum: this.state.basketListSum - item.price
    //   });
    //   //console.log(this.state.basketList)
    // }
  }
}

export default Basket;
