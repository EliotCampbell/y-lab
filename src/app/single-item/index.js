import {memo, useCallback, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useParams} from "react-router-dom";
import ItemDetails from "../../components/item-details";

function SingleItem() {
  const params = useParams()

  const store = useStore();

  useEffect(() => {
    store.actions.itemDetails.loadItemById(params.id);
  }, [params]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.itemDetails.item,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store])
  }

  return (
    <PageLayout>
      <Head title={select.item.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <ItemDetails item={select.item} itemAction={callbacks.addToBasket}/>
    </PageLayout>

  );
}

export default memo(SingleItem);
