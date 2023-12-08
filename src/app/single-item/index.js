import {memo, useCallback, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useParams} from "react-router-dom";
import ItemDetails from "../../components/item-details";
import Navbar from "../../components/navbar";

function SingleItem() {
  const params = useParams()

  const store = useStore();

  useEffect(() => {
    store.actions.itemDetails.loadItemById(params.id);
  }, [params]);

  const select = useSelector(state => ({
    item: state.itemDetails.item,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.item.title}/>
      <Navbar/>
      <ItemDetails item={select.item} itemAction={callbacks.addToBasket}/>
    </PageLayout>

  );
}

export default memo(SingleItem);
