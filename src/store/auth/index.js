import StoreModule from '../module';

const DEFAULT_AUTH_STATE = {
  loginValue: '',
  passwordValue: '',
  user: null,
  authError: null,
  isAuthenticating: false,
};

class AuthState extends StoreModule {
  initState() {
    return DEFAULT_AUTH_STATE;
  }

  /**
   * @return {Promise<void>}
   */
  async auth() {
    this.setState({
      ...this.getState(),
      isAuthenticating: true,
    });

    const login = this.getState().loginValue;
    const password = this.getState().passwordValue;

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      };
      const response = await fetch(`/api/v1/users/sign`, options);
      const json = await response.json();

      if (json.error) throw new Error(json.error.data?.issues?.[0]?.message || 'Ошибка при входе!');

      const {
        token,
        user: { username },
      } = json.result;

      if (token) {
        localStorage.setItem('token', token);
        this.setState(
          {
            loginValue: '',
            passwordValue: '',
            user: username,
            authError: null,
            isAuthenticating: false,
          },
          'Пользователь успешно вошел в систему',
        );
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        user: null,
        authError: error.message,
        isAuthenticating: false,
      });
    }
  }

  async signOut() {
    this.setState({
      ...this.getState(),
      isAuthenticating: true,
    });

    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem('token'),
        },
      };
      const response = await fetch(`/api/v1/users/sign`, options);
      const json = await response.json();

      if (json.error)
        throw new Error(json.error.data?.issues?.[0]?.message || 'Требуется авторизация!');

      if (json.result) {
        localStorage.removeItem('token');
        this.setState(Object.assign(DEFAULT_AUTH_STATE), 'Пользователь вышел из системы');
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        user: null,
        authError: error.message,
        isAuthenticating: false,
      });
    }
  }

  setLoginValue(login) {
    this.setState({
      ...this.getState(),
      loginValue: login,
    });
  }

  setPasswordValue(password) {
    this.setState({
      ...this.getState(),
      passwordValue: password,
    });
  }

  setUser(username) {
    this.setState({
      ...this.getState(),
      user: username,
    });
  }
}

export default AuthState;