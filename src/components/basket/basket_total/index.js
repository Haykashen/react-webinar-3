import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function BasketTotal({ ItemSum }) {
    return (
        <div className="BasketTotal">
        <b>Итого </b>
        <b>{ItemSum.toLocaleString("ru-RU")} ₽</b>
      </div>  
    );
  }
  
  BasketTotal.propTypes = {
    ItemSum: PropTypes.number.isRequired,
  };
  
  BasketTotal.defaultProps = {
    ItemSum: 0,
  };
  
  export default React.memo(BasketTotal);