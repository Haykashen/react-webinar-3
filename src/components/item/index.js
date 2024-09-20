import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './style.css';

function Item({ item, onAddItem }) {

  const callbacks = {
     onClick: e => {
       e.stopPropagation();
       onAddItem(item.code);
     },
    // setBasket: () =>{
    //   console.log('setBasket')
 
    //   props.setBasket((prevValue) => {
    //     console.log('prevvalue= ',prevValue, prevValue.Items); 
    //     let newValue = {...prevValue}; 
    //     if(!newValue.Items[props.item.code])// товара с таким индексом (использую уникальный код товара) нет
    //     {
    //       newValue.Items[props.item.code] = {...props.item};
    //       newValue.Items[props.item.code].count = 1;
    //       newValue.ItemUniqCount += 1; // +1 к уникальным товарам  
    //     }
    //     else{
    //       newValue.Items[props.item.code].count += 1;
    //     }
    //     newValue.ItemSum += newValue.Items[props.item.code].price; // общая сумма товаров
    //     newValue.Items[props.item.code].sum   = newValue.Items[props.item.code].count * newValue.Items[props.item.code].price;  // сумма по данному товару
    //     console.log(newValue)
    //     return newValue
    //   })
    // }   
  };
//

  return (
    <div className={'Item'}>
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-price" >{item.price.toLocaleString("ru-RU")} ₽</div>
      <div className="Item-actions">
        <button onClick={callbacks.onClick}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAddItem: PropTypes.func,
};

Item.defaultProps = {
  onAddItem: () => {},
  item: {
    code: 0,
    title: 'Без названия',
    price: 0,
  },  
};

export default React.memo(Item);
