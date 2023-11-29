/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Установка состояния
   * @param code {number}
   */
  //Добавление товара в корзину по коду
  addItemToCart(code) {
    const item = this.state.list.find(el=> el.code === code)
    const itemInCart = this.state.cart.find(el => el.code === code)
    if (itemInCart) {
      this.setState({
        ...this.state,
        cart: [...this.state.cart.filter((el) => el.code !== code), {...item, count: ++itemInCart.count }]
      })
    }
    else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {...item, count: 1}]
      })
    }
  };

  /**
   * Удаление из корины по коду
   * @param code {number}
   */
  deleteCartItem(code) {
    this.setState({
      ...this.state,
      // Новый массив, в котором не будет удаляемого товара
      cart: this.state.cart.filter(item => item.code !== code)
    })
  };
}

export default Store;
