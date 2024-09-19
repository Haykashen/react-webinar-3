import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './style.css';

function Item(props) {
  // Счётчик выделений
  //const [count, setCount] = useState(0);

  const callbacks = {
    // onClick: () => {
    //    props.onSelect(props.item.code);
    //    if (!props.item.selected) {
    //      setCount(count + 1);
    //    }
    // },
    // onDelete: e => {
    //   e.stopPropagation();
    //   props.onDelete(props.item.code);
    // },
    setBasket: () =>{
      console.log('setBasket')
 
      props.setBasket((prevValue) => {
        console.log('prevvalue= ',prevValue, prevValue.Items); 
        let newValue = {...prevValue}; 
        if(!newValue.Items[props.item.code])// товара с таким индексом (использую уникальный код товара) нет
        {
          newValue.Items[props.item.code] = {...props.item};
          newValue.Items[props.item.code].count = 1;
          newValue.ItemUniqCount += 1; // +1 к уникальным товарам  
        }
        else{
          newValue.Items[props.item.code].count += 1;
        }
        newValue.ItemSum += newValue.Items[props.item.code].price; // общая сумма товаров
        newValue.Items[props.item.code].sum   = newValue.Items[props.item.code].count * newValue.Items[props.item.code].price;  // сумма по данному товару
        console.log(newValue)
        return newValue
      })
    }   
  };
//

  return (
    <div className={'Item'}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price" >{props.item.price.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</div>
      <div className="Item-actions">
        <button onClick={callbacks.setBasket}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
//    selected: PropTypes.bool,
//    count: PropTypes.number,
  }).isRequired,
  setBasket: PropTypes.func,
//  onDelete: PropTypes.func,
//  onSelect: PropTypes.func,
};

Item.defaultProps = {
  setBasket: () => {},
//  onDelete: () => {},
//  onSelect: () => {},
};

export default React.memo(Item);
