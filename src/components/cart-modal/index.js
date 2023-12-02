import React from 'react'
import './style.css'
import PropTypes from "prop-types";
import {formattedPrice} from "../../utils";
import List from "../list";
import Button from "../button";
import Head from "../head";

const CartModal = (props) => {

  return (
    <div className='modal' onClick={() => props.setVisible(false)}>
      <div className={'modal-content'}
        onClick={(event) => event.stopPropagation()}
      >
        <Head title={'Корзина'}>
          <Button title={'Закрыть'} onClick={()=>props.setVisible(false)}/>
        </Head>
        <div className={'Cart-splitter'}/>
        <List list={props.cart.items}
              itemAction={props.onDeleteCartItem}
              itemButtonTitle={'Удалить'}
              headTitle={'Корзина'}
        />
        <div className={'Cart-summary'}>
          <b className='Cart-summaryTitle'>Итого</b>
          <b className='Cart-summaryValue'>{formattedPrice(props.cart.sum)}</b>
        </div>
      </div>
    </div>
  )
}

CartModal.propTypes = {
  children: PropTypes.node,
  setVisible: PropTypes.func,
  cart: PropTypes.shape({
    itemsCount: PropTypes.number,
    sum: PropTypes.number,
    items: PropTypes.array
  }),
}

CartModal.defaultProps = {
  setVisible: ()=>{},
  cart: {itemsCount:0, sum: 0, items: []}
}

export default CartModal
