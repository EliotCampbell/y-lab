import {memo, useCallback, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import UserInfo from "../../components/user-info";
import useInit from "../../hooks/use-init";

/**
 * Страница пользователя с первичной загрузкой товара по id из url адреса
 */
function Profile() {

  useInit(() => {}, [])

  const store = useStore();

  const {t} = useTranslate();

  const navigate = useNavigate()

  const callbacks = {
    // Добавление в корзину
    logout: useCallback((token) => store.actions.user.logout(token), [store])
  }

  const select = useSelector(state => ({
    userData: state.user.data,
    errorMessage: state.user.errorMessage,
    waiting: state.user.waiting,
  }));

  useEffect(() => {
    if (!select.userData.username && !select.waiting) {
      navigate('/login');
    }
  }, [navigate, select.waiting, select.userData.username]);

  return (
    <PageLayout>
      <Head title={t('title')} username={select.userData.profile?.name} userLogoutAction={callbacks.logout} t={t}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <UserInfo userdata={select.userData} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
