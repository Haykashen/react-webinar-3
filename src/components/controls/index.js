import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';

function Controls({ count, sum, showBasket, setShowBasket }) {
  let res = (count === 0) ? <b>{'пусто'}</b> : <b>{count+' '+plural(count, {one: 'товар',few: 'товара',many: 'товаров',})+' / '+sum.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</b>;
  return (
    <div className="Controls">
      <div>{'В корзине: '}{res}</div>
      <div className="Open-actions">
        <button onClick={() => setShowBasket(!showBasket)}>Перейти</button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  setBasket: PropTypes.func,
};

Controls.defaultProps = {
  setBasket: () => {},
};

export default React.memo(Controls);
