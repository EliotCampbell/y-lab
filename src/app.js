import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartModal from "./components/cart-modal/index";
import React from 'react';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [displayModal, setDisplayModal] = useState(false)

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
      <Controls
        cart={cart}
        setDisplayModal={setDisplayModal}
      />
      <List
        list={list}
        itemAction={callbacks.onAddItemToCart}
        itemButtonTitle={'Добавить'}
      />
      {displayModal &&
        <CartModal visible={displayModal}
                   setVisible={setDisplayModal}
                   cart={cart}
                   onDeleteCartItem={callbacks.onDeleteCartItem}
        />
      }
    </PageLayout>
  );
}

export default App;
