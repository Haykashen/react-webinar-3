import { useCallback, useEffect, useState, memo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import NavigatorMain from '../../components/navigator-main';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import useSelector from "../../store/use-selector";

function ItemDetail() {
  const { id } = useParams();
  const store = useStore();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/v1/articles/${id}`);
        if (!response.ok) {
          throw new Error('Сеть не отвечает');
        }
        const data = await response.json();
        setItem(data.result);
      } catch (error) {
        console.error('Ошибка при загрузке товара:', error);
      }
    };
    fetchItem();
  }, [id]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const basket = store.basket || {};

  const addToBasket = useCallback(() =>{
 //     console.log(, id)
      if (store.actions.basket) 
        store.actions.basket.addToBasket(id);
    },
    [store.actions.basket],
  );

  const openModalBasket = useCallback(() => {
    if (store.actions.modals) {
      store.actions.modals.open('basket');
    }
  }, [store.actions.modals]);

  if (!item) {
    return <div>Загрузка...</div>;
  }
//<div className="item-detail"> </div>
  return (   
    <PageLayout>
      <Head title={item.title}/>
      <NavigatorMain onOpen={openModalBasket} amount={select.amount} sum={select.sum}/>
      <div className="Body">
        <div className="description">Описание: {item.description}</div>
        <div className="country">Страна производителя: <span className="country-text">{item.country ? item.country : 'Не указано'}</span></div>
        <div className="categories">Категория: <span className="categories-text">{item.categories ? item.categories : 'Не указано'}</span></div>
        <div className="years">Год выпуска: <span className="years-text">{item.releaseYear ? item.releaseYear : 'Не указано'}</span></div>
        <div className="price">Цена: {item.price} ₽</div>
        <button onClick={addToBasket}>Добавить</button>
      </div>      
    </PageLayout> 
  );
}

export default memo(ItemDetail);