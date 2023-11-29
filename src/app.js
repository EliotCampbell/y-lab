import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart

  const callbacks = {
    onDeleteCartItem: useCallback((code) => {
      store.deleteCartItem(code);
    }, [store]),

    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code)
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cart={cart} onDeleteCartItem={callbacks.onDeleteCartItem}/>
      <List list={list}
            onAddItemToCart={callbacks.onAddItemToCart}
      />
    </PageLayout>
  );
}

export default App;
