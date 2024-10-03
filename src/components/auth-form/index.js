import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Input from '../input';
import Spinner from '../spinner';
import './style.css';
import useTranslate from '../../hooks/use-translate';
import {useNavigate} from 'react-router-dom';

function AuthForm() {
  const cn = bem('AuthForm');

  const { t } = useTranslate();
  const navigate = useNavigate();
  const store = useStore();

  const select = useSelector(state => ({
    login: state.auth.loginValue,
    password: state.auth.passwordValue,
    error: state.auth.authError,
    waiting: state.auth.isAuthenticating,
  }));

  const callbacks = {
    onSubmitForm: useCallback(() => store.actions.auth.auth(), [store]),
    onChangeLogin: useCallback(value => store.actions.auth.setLoginValue(value), [store]),
    onChangePassword: useCallback(value => store.actions.auth.setPasswordValue(value), [store]),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('login.title')}</div>
      <form
        onSubmit={e => {
          e.preventDefault();
          callbacks.onSubmitForm();
          console.log(store.actions.auth.getState().isAuthenticating)
          // if(store.actions.auth.getState().isAuthenticating)
          //   () => navigate('/profile')
        }}
      >
        <Spinner active={select.waiting}>
          <div className={cn('row')}>
            <Input
              id="username"
              value={select.login}
              onChange={callbacks.onChangeLogin}
              placeholder={t('login.username.placeholder')}
              label={t('login.username')}
            />
          </div>
          <div className={cn('row')}>
            <Input
              id="password"
              type="password"
              value={select.password}
              onChange={callbacks.onChangePassword}
              placeholder={t('login.password.placeholder')}
              label={t('login.password')}
            />
          </div>
          <div className={cn('row', { errors: true })}>{select.error}</div>
          <div className={cn('row')}>
            <button type="submit">{t('getIn')}</button>
          </div>
        </Spinner>
      </form>
    </div>
  );
}

AuthForm.propTypes = {
  t: PropTypes.func,
};

export default memo(AuthForm);