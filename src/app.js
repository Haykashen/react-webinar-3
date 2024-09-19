import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Basket from './components/basket';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const [basket, setBasket] = React.useState({
    ItemSum:0,
    ItemUniqCount:0,
    Items:{}

  })
  const[showBasket, setShowBasket] = React.useState(false)

  const callbacks = {
    // onDeleteItem: useCallback(
    //   code => {
    //     store.deleteItem(code);
    //   },
    //   [store],
    // ),

    // onSelectItem: useCallback(
    //   code => {
    //     store.selectItem(code);
    //   },
    //   [store],
    // ),

    // onAddItem: useCallback(() => {
    //   store.addItem();
    // }, [store]),
  };
// 
  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls 
        count={basket.ItemUniqCount} 
        sum={basket.ItemSum} 
        showBasket={showBasket} 
        setShowBasket={setShowBasket}
      />
      <List
        list={list}
        setBasket={setBasket}
        // onDeleteItem={callbacks.onDeleteItem}
        // onSelectItem={callbacks.onSelectItem}
      />
      {showBasket && <Basket 
        basket={basket} 
        setBasket={setBasket} 
        showBasket={showBasket} 
        setShowBasket={setShowBasket}/>} 
    </PageLayout>
  );
}

export default App;
