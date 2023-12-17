import {useEffect} from 'react';
import useStore from "./use-store";
import {getCookie} from "../utils";

/**
 * Хук для асинхронных расчётов, которые будут исполнены при первом рендере или изменении depends.
 * @param initFunc {Function} Пользовательская функция
 * @param depends {Array} Значения при смене которых callback снова исполнится.
 * @param options {{backForward}}
 */
export default function useInit(initFunc, depends = [], backForward = false) {

  const store = useStore()

  useEffect(() => {
    store.actions.userSession.checkAuth(getCookie('token'))
    initFunc(false);
    // Если в истории браузера меняются только search-параметры, то react-router не оповестит
    // компонент об изменениях, поэтому хук можно явно подписать на событие изменения истории
    // браузера (если нужно отреагировать на изменения search-параметров при переходе по истории)
    if (backForward) {
      window.addEventListener('popstate', initFunc);
      return () => {
        window.removeEventListener('popstate', initFunc);
      };
    }
  }, depends);
}
