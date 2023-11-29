/**
 * Генератор чисел с шагом 1
 * Вариант с замыканием на начальное значение в самовызываемой функции.
 * @returns {Number}
 */
export const generateCode = (function (start = 0) {
  return () => ++start;
}());

/**
 * Форматтер цены
 * Вариант с замыканием на начальное значение в самовызываемой функции.
 * @returns {Number}
 */
export function formattedPrice(price) {
  let parts = price.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".") + ' ₽';
}

//геттер итоговой суммы корзины
export function getCartSum(cart) {
  const sum = cart.reduce((acc, el) => (el.price * el.count + acc),0)
  return formattedPrice(sum)
}