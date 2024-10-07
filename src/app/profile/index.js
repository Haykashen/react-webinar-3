import { memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import AuthBlock from '../../containers/auth-block';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import ProfileInfo from '../../components/profile-info';

/**
 * Страница профиля
 */
function Profile() {
  const { t } = useTranslate();
  const store = useStore();
  const navigate = useNavigate();

  useInit(() => {
    store.actions.user.fetchUserProfile();
  }, []);

  const select = useSelector(state => ({
    profile: state.user.userInfo,
    error: state.user.fetchError,
    waiting: state.user.isLoading,
    username: state.auth.username,
  }));

  const callbacks = {
    setUsername: useCallback(username => store.actions.auth.setUser(username), [store]),
    logOutHandler: useCallback(async () => {
      await store.actions.auth.signOut();
      navigate('/auth');
    }, [store]),
  };

  useEffect(() => {
    if (select.profile.loginName) {
      callbacks.setUsername(select.profile.loginName);
    }
  }, [select.profile.loginName]);

  useEffect(() => {
    if (select.error) {
      callbacks.logOutHandler();
    }
  }, [select.error]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/auth');
    }
  }, [select.username]);

  return (
    <PageLayout>
      <AuthBlock 
        logout = {t('logout')}
        login  = {t('login')}
      />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileInfo profile={select.profile} title={t('profile.title')} name={t('profile.name')} phone={t('profile.phone')} email={t('profile.email')}/>
    </PageLayout>
  );
}

export default memo(Profile);