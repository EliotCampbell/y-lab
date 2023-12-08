import {memo} from 'react';
import propTypes from 'prop-types';
import PropTypes from "prop-types";
import './style.css';
import {numberFormat} from "../../utils";

function ItemDetails({item, itemAction}) {

  const callbacks = {
    onAdd: () => itemAction(item._id)
  }

  return (
    <div className={'itemDetails'}>
      <div className={'itemDetails-text'}>{item.description}</div>
      <div className={'itemDetails-text'}>{`Страна-производитель: `}<b className={'itemDetails-text'}>{`${item.madeIn?.title} (${item.madeIn?.code})`}</b></div>
      <div className={'itemDetails-text'}>{`Категория: `}<b className={'itemDetails-text'}>{`${item.category?.title}`}</b></div>
      <div className={'itemDetails-text'}>{`Год выпуска: `}<b className={'itemDetails-text'}>{`${item.edition}`}</b></div>
      <div className={'itemDetails-price'}><b>{`Цена: ${numberFormat(item.price)} ₽`}</b></div>
      <div className={'itemDetails-text'}><button onClick={callbacks.onAdd}>Добавить</button></div>
    </div>
  )
}

ItemDetails.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    })
  }).isRequired,
  onRemove: propTypes.func,
}

ItemDetails.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemDetails);
