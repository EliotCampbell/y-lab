import StoreModule from "../module";

/**
 * Модуль состояния пользователя для управления данными и действиями, связанными с пользователем.
 */
class UserState extends StoreModule {
  /**
   * Инициализация состояния пользователя значениями по умолчанию.
   * @returns {Object} Объект начального состояния.
   */
  initState() {
    return {
      data: {},
      waiting: true, // Индикатор загрузки данных. True по умолчанию, так как в любом случае проверяем аутентификацию
      errorMessage: '',
    };
  }

  /**
   * Аутентификация пользователя с использованием предоставленного логина и пароля.
   * @param {String} login - Логин пользователя.
   * @param {String} password - Пароль пользователя.
   * @returns {Promise<void>} Промис, который разрешается при завершении аутентификации.
   */
  async auth(login, password) {
    try {
      this.setState({ ...this.initState()},
        'Установка флага загрузки')
      if (!login || !password) {
        throw  new Error('Не передан логин или пароль')
      }
      await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          password,
        }),
      }).then(response => response.json())
        .then(data => {
          if (data.result) {
            this.setState({ ...this.initState(), data: data.result.user, waiting: false },
              'Успешный вход, обновление состояния пользователя');
          } else if (data.error) {
            throw new Error(data.error.message);
          } else {
            throw new Error('Непредвиденный ответ от сервера');
          }
        })
    } catch (error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        errorMessage: error.message,
        },'Сброс флага и запись ошибки');
    }
  }

    /**
     * Проверка валидности предоставленного токена для аутентификации пользователя.
     * @param {String} token - Токен аутентификации пользователя.
     * @returns {Promise<void>} Промис, который разрешается при завершении проверки токена.
     */
    async checkAuth(token) {
      try {
        // Проверка наличия предоставленного токена
        if (!token) return this.setState({...this.getState(), waiting: false},
          'Сброс флага загрузки');
        // Проверка валидности токена
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
              },'Токен валиден, обновление данных пользователя');
            } else {
              throw new Error('Ошибка аутентификации');
            }
          }))
      } catch (error) {
        console.log(error.message)
        this.setState({...this.getState(), waiting: false},
          'Сброс флага загрузки')
      }
    }

    /**
     * Выход пользователя с использованием предоставленного токена.
     * @param {String} token - Токен аутентификации пользователя.
     * @returns {Promise<void>} Промис, который разрешается при завершении выхода.
     */
    async logout(token) {
      try {
        if (!token) return; // Проверка наличия токена в куках
        this.setState({ ...this.getState(), waiting: true },
          'Установлен флаг загрузки');
        const response = await fetch('/api/v1/users/sign', {
          method: 'DELETE',
          headers: {
            'X-Token': token,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          this.setState({...this.initState(), waiting: false},
            'Успешный выход, обновление состояния пользователя');
          document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; //Удаление токена из кук, так как сервер сам не удаляет куку
        } else {
          throw new Error('Ошибка при выходе');
        }
      } catch (error) {
        console.log(error.message)
        this.setState({...this.getState(), waiting: false,},
          'Сброс флага загрузки');
      }
    }
  }

  export default UserState;
