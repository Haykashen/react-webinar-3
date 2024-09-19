import React from 'react';
import PropTypes from 'prop-types';
//import Item from '../item';
import './style.css';

function Basket({ basket, setBasket }) {
  let itemArray = [];
  const deleteItem = (event)=> {
    console.log(event.target.id)
     setBasket(prevValue => {
         let newValue = {...prevValue}
         if(newValue.Items[event.target.id].count > 1)
         {
            newValue.Items[event.target.id].count -= 1;  
            newValue.Items[event.target.id].sum -= newValue.Items[event.target.id].price;
            newValue.ItemSum -= newValue.Items[event.target.id].price;
            
         }  
         else{
           newValue.ItemSum -= newValue.Items[event.target.id].price; 
           newValue.ItemUniqCount -= 1;
           delete newValue.Items[event.target.id]
         } 

         return newValue;
     })
  }

  for(let key in basket.Items)
  {
    itemArray.push(    
      <div  key={basket.Items[key].code}className="List-item Item">
        <div className="Item-code">{basket.Items[key].code}</div>
        <div className="Item-title">{basket.Items[key].title}</div>
        <div className="Item-price" >{basket.Items[key].price.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</div>
        <div className="Item-count" >{basket.Items[key].count} шт</div>
        <div className="Item-actions">
          <button id={basket.Items[key].code} onClick={deleteItem}>Удалить</button>
        </div>
      </div>)    
  }  

  return (
    <>
    <div className="Head">
        <h1>Корзина</h1>
    </div>
    <div className="List">
      {itemArray}
    </div>
    <div className="Total">
      <b>Итого </b>
      <b>{basket.ItemSum.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</b>
    </div>    
    
   </>  
  );
}
// {basket.list.map(item => (
//     <div key={item.code} className="List-item">
//       <Item item={item} setBasket={setBasket}/>
//     </div>      
//   ))}
Basket.propTypes = {
    basket: PropTypes.object.isRequired,
  setBasket: PropTypes.func,
};

Basket.defaultProps = {
    setBasket: () => {},
};

export default React.memo(Basket);