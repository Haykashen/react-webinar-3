import { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { Route, Routes } from 'react-router-dom';
import ItemDetail from "./item_detail";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/item/:id" element={<ItemDetail />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}
//<Route path='/item' element={<Item />}/>
export default App;
