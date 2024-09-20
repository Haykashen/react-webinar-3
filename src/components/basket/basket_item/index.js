import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function BasketItem({ item, onDeleteItem }) {

  const callbacks = {
    deleteItem: (e) => {
       e.stopPropagation(); 
       onDeleteItem(item.code)//,event.target.id 
    }
  }
   
  return (
    <div  key={item.code}className="Item">
        <div className="Item-code">{item.code}</div>
        <div className="Item-title">{item.title}</div>
        <div className="Item-price" >{item.price.toLocaleString("ru-RU")} ₽</div>
        <div className="Item-count" >{item.count} шт</div>
        <div className="Item-actions">
          <button id={item.code} onClick={callbacks.deleteItem}>Удалить</button>
        </div>
    </div>
  );
}

BasketItem.propTypes = {
    item: PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        count: PropTypes.number,
        price: PropTypes.number,
      }).isRequired,
  onDeleteItem: PropTypes.func,
};

BasketItem.defaultProps = {
  onDeleteItem: () => {},
  item: {
    code: 0,
    title: 'Без названия',
    count: 0,
    price: 0,
  },  
};

export default React.memo(BasketItem);