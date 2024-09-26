import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import './style.css';
import {Link} from "react-router-dom";

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
    // Меняем страницу
    changePage: useCallback(newPage => setPage(newPage), []),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  const renderPagination = () => {
    const pages = [];
    if (totalPages <= 5) {
      // Если страниц 5 или меньше, показываем их все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 2) {
        // Когда текущая страница <= 2
        pages.push(1, 2, 3, '...', totalPages);
      } else if (page >= totalPages - 2) {
        // Когда текущая страница близка к последней
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else if (page === 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else {
        // Для всех остальных случаев
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <div className="under-title">
        <Link to="/">Главная</Link>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      </div>
      <List list={select.list} renderItem={renders.item} />
      <div className="pagination-container">
        <div className="pagination">
          {renderPagination().map((pageNumber, index) =>
            pageNumber === '...' ? (
              <span key={index} className="pagination-ellipsis">
                ...
              </span>
            ) : (
              <button key={index} className={pageNumber === page ? 'active' : ''} onClick={() => callbacks.changePage(pageNumber)} disabled={pageNumber === page}>
                {pageNumber}
              </button>
            ),
          )}
        </div>
      </div>      
    </PageLayout>
  );
}

export default memo(Main);
