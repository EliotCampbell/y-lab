import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Navbar from "../../components/navbar";

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    params: {
      currentPage: state.catalog.currentPage,
      count: state.catalog.count
    }
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Обновление списка товаров
    updateList: useCallback((page, limit) => store.actions.catalog.load(page, limit), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} itemPath={`item/${item._id}`}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Navbar/>
      <List list={select.list} renderItem={renders.item} onPageChange={callbacks.updateList} params={select.params}/>
    </PageLayout>

  );
}

export default memo(Main);
