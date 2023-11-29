import React, {useState} from "react";
import PropTypes from 'prop-types';
import './style.css';
import Modal from "../modal/modal";
import Cart from "../cart";
import {getCartSum} from "../../utils";
import Button from "../button";

function Controls({cart, onDeleteCartItem}) {

  const [displayModal, setDisplayModal] = useState(false)
  return (
    <div className='Controls'>
      <div className='Controls-info'>
        В корзине:
        <b className='Controls-info_bold'>{`${cart.length} товара / ${getCartSum(cart)}`}</b>
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
  cart: PropTypes.array
};

Controls.defaultProps = {
  cart: []
}

export default React.memo(Controls);
