import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";
import useInit from "../../hooks/use-init";

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Login() {

  const store = useStore();

  useInit(() => {}, [], true);

  const select = useSelector(state => ({
    username: state.user.data.profile?.name,
    errorMessage: state.user.errorMessage,
    waiting: state.user.waiting,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Аутентификация
    auth: useCallback((login, password) => store.actions.user.auth(login, password), [store]),
    logout: useCallback((token) => store.actions.user.logout(token), [store])
  }

  return (
    <PageLayout>
      <Spinner active={select.waiting}>
        <Head title={t('title')} username={select.username} userLogoutAction={callbacks.logout} t={t}>
          <LocaleSelect/>
        </Head>
        <Navigation/>
        <LoginForm auth={callbacks.auth} errorMessage={select.errorMessage} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
