import {memo, useCallback, useEffect} from 'react';
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
import {useLocation, useNavigate} from "react-router-dom";

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Login() {

  const store = useStore();

  useInit(() => {}, [], true);

  const navigate = useNavigate()
  const location = useLocation();
  console.log(location)

  const select = useSelector(state => ({
    username: state.userSession.data.profile?.name,
    errorMessage: state.userSession.errorMessage,
    waiting: state.userSession.waiting,
    isAuth: state.userSession.isAuth
  }));

  useEffect(() => {
    if (select.isAuth && location.key !== "default") {
      navigate(-1)
    }
    if (select.isAuth) {
      navigate('/profile')
    }
  }, [navigate, select.isAuth]);

  const {t} = useTranslate();

  const callbacks = {
    // Аутентификация
    auth: useCallback((login, password) => store.actions.userSession.auth(login, password), [store]),
    // Сброс аутентификации
    logout: useCallback((token) => store.actions.userSession.logout(token), [store])
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
