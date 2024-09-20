import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function BasketHead({ title, showBasket, setShowBasket }) {
  return (
    <div className="BasketHead">
      <h1>{title}</h1>
      <div className="Actions">
        <button onClick={() => setShowBasket(!showBasket)}>Закрыть</button>
      </div>
    </div>
  );
}

BasketHead.propTypes = {
  title: PropTypes.node,
  showBasket: PropTypes.bool,
  setShowBasket: PropTypes.func
};

BasketHead.defaultProps = {
    setShowBasket: () => {},
};

export default React.memo(BasketHead);