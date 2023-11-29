import React from 'react';
import './style.css'
import Item from "../item";
import Head from "../head";
import Button from "../button";
import {getCartSum} from "../../utils";
import PropTypes from "prop-types";

const Cart = ({cart, onDeleteCartItem, setVisible}) => {
  return (
    <div className='Cart'>
      <Head title={'Корзина'}>
        <Button title={'Закрыть'} onClick={()=>setVisible(false)}/>
      </Head>
      <div className={'Cart-splitter'}/>
      {cart.map((item)=>(
        <div key={item.code} className='List-item'>
          <Item item={item}
                buttonAction={onDeleteCartItem}
                buttonTitle={'Удалить'}
                type={'cartItem'}
          />
        </div>
      ))}
      <div className={'Cart-summary'}>
          <b className='Cart-summaryTitle'>Итого</b>
          <b className='Cart-summaryValue'>{getCartSum(cart)}</b>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })),
  onDeleteCartItem: PropTypes.func,
  setVisible: PropTypes.func
};

Cart.defaultProps = {
  onDeleteCartItem: ()=>{},
  setVisible: () => {},
  cart: []
}

export default Cart;