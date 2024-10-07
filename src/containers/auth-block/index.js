import { memo, useCallback } from 'react';
import SideLayout from '../../components/side-layout';
import { useNavigate, Link } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';

function AuthBlock({logout, login}) {
  const store = useStore();
  const navigate = useNavigate();
 // const { t } = useTranslate();

  const callbacks = {
    logOutHandler: useCallback(async () => {
      await store.actions.auth.signOut();
      navigate('/auth');
    }, [store]),
    logInHandler: useCallback(() =>{
      console.log('login button')
      store.actions.auth.setAuthError('');
      navigate('/auth')
    },[])
  };

  const select = useSelector(state => ({
    username: state.user.userInfo.fullName,
  }));

  return (
    <SideLayout side="end" padding="medium">
      {select.username ? (
        <SideLayout side="between">
          <Link to="/profile">{select.username}</Link>
          {'  '}
          <button onClick={callbacks.logOutHandler}>{logout}</button>
        </SideLayout>
      ) : (
        <button onClick={() => callbacks.logInHandler()}>{login}</button>
      )}
    </SideLayout>
  );
}

export default memo(AuthBlock);