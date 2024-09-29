import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import List from '../../components/list';
import PaginationContainer from '../../components/pagination-container';
import NavigatorMain from '../../components/navigator-main';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { renderPaginationArray } from '../../utils';


function Main() {
  const store = useStore();

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    store.actions.catalog.load({ limit, skip: (page - 1) * limit }).then(response => {
      setTotal(response.count);
    });
  }, [page, store.actions.catalog]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket') , [store]),  
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <NavigatorMain onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List list={select.list} renderItem={renders.item} />
      <PaginationContainer pagination = {renderPaginationArray(page, totalPages)} setPage = {setPage} page ={page}/> 
    </PageLayout>
  );
}

export default memo(Main);
