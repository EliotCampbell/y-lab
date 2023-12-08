import React, {useCallback, memo} from 'react';
import Menu from "../menu";
import BasketTool from "../basket-tool";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import './style.css'

const Navbar = () => {

  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <div className={'Navbar'}>
      <Menu/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
    </div>
  );
};

export default memo(Navbar);