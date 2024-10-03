import { memo, useCallback } from 'react';
import SideLayout from '../../components/side-layout';
import { useNavigate, Link } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';

function AuthBlock() {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();

  const callbacks = {
    logOutHandler: useCallback(async () => {
      await store.actions.auth.signOut();
      navigate('/auth');
    }, [store]),
  };

  const select = useSelector(state => ({
    username: state.auth.user,
  }));

  return (
    <SideLayout side="end" padding="medium">
      {select.username ? (
        <SideLayout side="between">
          <Link to="/profile">{select.username}</Link>
          {'  '}
          <button onClick={callbacks.logOutHandler}>{t('logout')}</button>
        </SideLayout>
      ) : (
        <button onClick={() => navigate('/auth')}>{t('login')}</button>
      )}
    </SideLayout>
  );
}

export default memo(AuthBlock);