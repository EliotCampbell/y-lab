import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {formattedPrice, plural} from "../../utils";
import Button from "../button";

function Controls(props) {


  return (
    <div className='Controls'>
      <div className='Controls-info'>
        В корзине:
        {
          props.cart.itemsCount > 0
            ? <b className='Controls-info_bold'>{`${props.cart.itemsCount + ' ' + plural(props.cart.itemsCount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров'
            })} / ${formattedPrice(props.cart.sum)}`}
              </b>
            : <b className='Controls-info_bold'>пусто</b>}
      </div>
      <div className='Controls-action'>
        <Button onClick={() => (props.setDisplayModal(true))} title={'Перейти'}/>
      </div>
    </div>
  )
}

Controls.propTypes = {
  cart: PropTypes.shape({
    itemsCount: PropTypes.number,
    sum: PropTypes.number
  }),
  setDisplayModal: PropTypes.func
};

Controls.defaultProps = {
  setDisplayModal: ()=>{},
  cart: {itemsCount:0, sum: 0}
}

export default React.memo(Controls);
