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
    const itemInCart = this.state.cart.items.find(el => el.code === code)
    if (itemInCart) {
      const newItemsArr = this.state.cart.items.map(el => {
        if (el.code === code) {
          return ({ ...el, count: el.count + 1 })
        }
          else {
            return el
          }
        }
      )
      const newCart = {items: newItemsArr, sum: this.getCartSum(newItemsArr), itemsCount: newItemsArr.length}
      this.setState({...this.state, cart: newCart})
    }
    else {
      const newItemsArr = [...this.state.cart.items, {...item, count: 1}]
      const newCart = {items: newItemsArr, sum: this.getCartSum(newItemsArr), itemsCount: newItemsArr.length}
      this.setState({...this.state, cart: newCart})
    }
  };

  /**
   * Удаление из корины по коду
   * @param code {number}
   */
  deleteCartItem(code) {
    const newItemsArr = this.state.cart.items.filter(item => item.code !== code)
    const newCart = {items: newItemsArr, sum: this.getCartSum(newItemsArr), itemsCount: newItemsArr.length}
    this.setState({...this.state, cart: newCart})
  };

  /**
   * Геттер итоговой суммы корзины
   * @returns {number}
   */
  getCartSum(itemsArr) {
    return itemsArr.reduce((acc, { price, count }) => acc + price * count, 0);
  }
}

export default Store;
