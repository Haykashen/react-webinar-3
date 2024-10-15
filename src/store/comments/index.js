import StoreModule from '../module';

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class CommentsState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false, // признак ожидания загрузки
    };
  }

  /**
   * Загрузка товаров по id
   * @param id {String}
   * @return {Promise<void>}
   */
  async load(id) {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      data: {},
      waiting: true,
    });

    try {
      const res = await this.services.api.request({
        url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
      });

      // Товар загружен успешно
      this.setState(
        {
          data: res.data.result,
          waiting: false,
        },
        'Загружены комментарии из АПИ',
      );
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        data: {},
        waiting: false,
      });
    }
  }
}

export default CommentsState;