import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import useSelector from "../../hooks/use-selector";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    username: state.userSession.data.profile?.name,
  }));

  useInit(() => {
    store.actions.categories.setCategories();
    store.actions.catalog.initParams();
  }, [], true);

  const callbacks = {
    // Аутентификация
    auth: useCallback((login, password) => store.actions.userSession.auth(login, password), [store]),
    // Сброс аутентификации
    logout: useCallback((token) => store.actions.userSession.logout(token), [store])
  }

  const {t} = useTranslate();

  return (
    <PageLayout>
      <Head title={t('title')} username={select.username} userLogoutAction={callbacks.logout} t={t}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
