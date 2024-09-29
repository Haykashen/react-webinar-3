//import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
//    this.generateCode = codeGenerator(0);
    this.activePage = 1; // текущая страница
    this.countPages = 1; // всего страниц
  }

  initState() {
    return {
      list: [],
    };
  }

  /**
   * Установка текущей страницы
   * @param page {Number}
   */
  setActivePage(page = 1){
    this.activePage = page;
  }

  /**
   * Установка кол-ва страниц
   * @param count {Number}
   */
  setCountPages(count = 1){
    this.countPages = count;
  }

  getActivePage(){
    return this.activePage;
  }

  getCountPages(){
    return this.countPages;
  }

  async load({ limit, skip }) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id,title,price),count`);
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ',
    );

    return { count: json.result.count };
  }
}

export default Catalog;
