import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Basket({ children}) {

  return (
    <div className="BasketModal-overlay"> {/* Затемненный фон */}
      <div className="BasketModal" onClick={(e) => e.stopPropagation()}> {/* Окно, которое не закрывается при клике внутри */}
        {children}
      </div>
    </div>
  );
}

export default React.memo(Basket);