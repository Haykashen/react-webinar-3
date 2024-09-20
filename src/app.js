import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Basket from './components/basket';
import BasketHead from './components/basket/basket_head';
import BasketTotal from './components/basket/basket_total';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basketListSum = store.getState().basketListSum;
  const basketList = store.getState().basketList;

  const[showBasket, setShowBasket] = React.useState(false)

  const callbacks = {
     onDeleteItem: useCallback((code) => {
         store.deleteItem(code);
       },
       [store],
     ),

     onAddItem: useCallback((code) => {
       store.addItem(code);
     }, [store]),
  };
 
  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls 
        count={basketList.length} 
        sum={basketListSum} 
        showBasket={showBasket} 
        setShowBasket={setShowBasket}
      />
      <List
        list={list}
        onAddItem={callbacks.onAddItem}
      />
      {showBasket && <Basket >
          <BasketHead 
            title="Корзина" 
            showBasket={showBasket} 
            setShowBasket={setShowBasket}            
          />
          <br/>
          <List
            list={basketList}
            onDeleteItem={callbacks.onDeleteItem}
          />          
          <BasketTotal
            ItemSum = {basketListSum}
          />
        </Basket>} 
    </PageLayout>
  );
}

export default App;
