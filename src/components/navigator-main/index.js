import { memo } from 'react';
import BasketTool from '../../components/basket-tool';
import './style.css';
import {Link} from "react-router-dom";

function NavigatorMain ({ onOpen, amount, sum }){

    return(
      <div className="NavigatorMain">
        <Link to="/">Главная</Link>
        <BasketTool onOpen={onOpen} amount={amount} sum={sum} />
      </div>
    )
}

export default memo(NavigatorMain);