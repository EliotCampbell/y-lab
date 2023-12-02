import React, {useState} from "react";
import PropTypes from 'prop-types';
import './style.css';
import Modal from "../modal/modal";
import Cart from "../cart";
import {formattedPrice, plural} from "../../utils";
import Button from "../button";

function Controls({cart, onDeleteCartItem}) {

  const [displayModal, setDisplayModal] = useState(false)
  return (
    <div className='Controls'>
      <div className='Controls-info'>
        В корзине:
        {
          cart.itemsCount > 0
            ? <b className='Controls-info_bold'>{`${cart.itemsCount + ' ' + plural(cart.itemsCount, {
              one: 'товар',
              few: 'товара',
              many: 'товаров'
            })} / ${formattedPrice(cart.sum)}`}
              </b>
            : <b className='Controls-info_bold'>пусто</b>}
      </div>
      <div className='Controls-action'>
        <Button onClick={() => (setDisplayModal(true))} title={'Перейти'}/>
        {displayModal &&
          <Modal visible={displayModal} setVisible={setDisplayModal}>
            <Cart cart={cart} onDeleteCartItem={onDeleteCartItem} setVisible={setDisplayModal}/>
          </Modal>
        }
      </div>
    </div>
  )
}

Controls.propTypes = {
  cart: PropTypes.object,
  onDeleteCartItem: PropTypes.func
};

Controls.defaultProps = {
  onDeleteCartItem: ()=>{},
  cart: []
}

export default React.memo(Controls);
