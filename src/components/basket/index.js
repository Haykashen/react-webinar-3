import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Basket({ children}) {

  return (
    <>
     {children}
   </>  
  );
}

export default React.memo(Basket);