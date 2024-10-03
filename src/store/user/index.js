import StoreModule from '../module';

const DEFAULT_USER_STATE = {
  userInfo: { fullName: null, contactEmail: null, contactPhone: null, loginName: null },
  fetchError: null,
  isLoading: false,
};

/**
 * Управление состоянием пользователя
 */
class UserProfileState extends StoreModule {
  initState() {
    return DEFAULT_USER_STATE;
  }

  /**
   * Получение профиля пользователя
   * @return {Promise<void>}
   */
  async fetchUserProfile() {
    this.setState({
      ...this.getState(),
      isLoading: true,
    });

    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem('token'),
        },
      };
      const response = await fetch(`/api/v1/users/self?fields=*`, options);
      const json = await response.json();

      if (json.error)
        throw new Error(json.error.data?.issues?.[0]?.message || 'Необходима авторизация!');

      const {
        email: contactEmail,
        username: loginName,
        profile: { name: fullName, phone: contactPhone },
      } = json.result;

      this.setState(
        {
          userInfo: { contactEmail, fullName, contactPhone, loginName },
          fetchError: null,
          isLoading: false,
        },
        'Данные пользователя успешно загружены',
      );
    } catch (error) {
      this.setState(Object.assign(DEFAULT_USER_STATE, { fetchError: error.message }));
    }
  }
}

export default UserProfileState;