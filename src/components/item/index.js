import React from "react";
import PropTypes from "prop-types";
import {formattedPrice} from "../../utils";
import './style.css';
import Button from "../button";

function Item({item, buttonAction, buttonTitle}) {

  const toCartHandler = (code) => {
    buttonAction(code)
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{item.code}</div>
      <div className='Item-title'>
        {item.title}
      </div>
      <div className='Item-price'>
        {formattedPrice(item.price)}
      </div>
      {item.count && (<div className='Item-count'>
        {`${item.count} шт`}
      </div>)}
      <div className='Item-actions'>
        <Button title={buttonTitle} onClick={()=> toCartHandler(item.code)}/>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    code: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  buttonTitle: PropTypes.string,
  buttonAction: PropTypes.func,
};

Item.defaultProps = {
  buttonAction: () => {
  }
}

export default React.memo(Item);
