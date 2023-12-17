import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import {getCookie} from "../../utils";
import UserInfo from "../../components/user-info";
import Spinner from "../../components/spinner";
import CheckAuth from "../../containers/check-auth";

/**
 * Страница пользователя с первичной загрузкой товара по id из url адреса
 */
function Profile() {

  useInit(() => {
    store.actions.userProfile.getUser(getCookie('token'))
  }, [])

  const store = useStore();

  const {t} = useTranslate();

  const callbacks = {
    //сброс аутентификации
    logout: useCallback((token) => store.actions.userSession.logout(token), [store])
  }

  const select = useSelector(state => ({
    userProfile: state.userProfile.data,
    isAuth: state.userSession.isAuth,
    waiting: state.userProfile.waiting,
    userData: state.userSession.data,
  }));

  return (
    <PageLayout>
      <Head title={t('title')} username={select.userData.profile?.name} userLogoutAction={callbacks.logout} t={t}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CheckAuth redirectPath={'/login'}>
        <Spinner active={select.waiting}>
          <UserInfo userdata={select.userProfile} t={t}/>
        </Spinner>
      </CheckAuth>
    </PageLayout>
  );
}

export default memo(Profile);
