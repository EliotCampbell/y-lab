import StoreModule from "../module";

/**
 * Модуль состояния пользователя для получения данных.
 */
class UserProfileState extends StoreModule {
  /**
   * Инициализация состояния пользователя значениями по умолчанию.
   * @returns {Object} Объект начального состояния.
   */
  initState() {
    return {
      data: {},
      waiting: true, // Индикатор загрузки данных
    };
  }

  /**
   * Получение пользователя по токену. (В будущем можно аналогично получать по id)
   * @param {String} token - Токен подгружаемого пользователя.
   * @returns {Promise<void>} Промис, который разрешается при завершении подгрузки токена.
   */
  async getUser(token) {
    try {
      // Проверка наличия предоставленного токена
      if (!token) return this.setState({...this.getState(), waiting: false},
        'Сброс флага загрузки');
      // Получение user
      await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
        .then((data => {
          if (data.result) {
            this.setState({
              ...this.initState(),
              waiting: false,
              data: data.result,
              isAuth: true
            }, 'Подгрузка данных пользователя');
          } else throw new Error('Ошибка запроса');
        }))
    } catch (error) {
        this.setState({...this.getState(), waiting: false}, 'Ошибка. Сброс флага загрузки');
      }
  }
}


  export default UserProfileState;
