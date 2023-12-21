export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */

  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,_type,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        // Комментарии загружены успешно
        if (res) {
          dispatch({
            type: 'comments/load-success',
            payload: {
              data: {
                comments: res.data.result.items,
                count:res.data.result.count
              },
              commentsParent: id,
              entityForComment: id
            }
          });
        }
      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },
  /**
   * Выбор сущности для комментария
   * @param {string} id - Идентификатор сущности
   * @return {Function} - Функция, выполняющая выбор сущности для комментария
   */
  selectEntityForComment: (id) => {
    return (dispatch) => {
      dispatch({type: 'comments/selectEntityForComment', payload: {entityForComment: id}});
    }
  },
  /**
   * Сброс сущности для комментария
   * @param {string} [id] - Идентификатор сущности (опционально)
   * @return {Function} - Функция, выполняющая сброс сущности для комментария
   */
  resetEntityForComment: (id) => { //id опционально
    return (dispatch, getState) => {
      dispatch({type: 'comments/resetEntityForComment', payload: {entityForComment: id || getState().comments.commentsParent}});
    }
  },
  /**
   * Отправка комментария
   * @param {string} commentText - Текст комментария
   * @param {string} parentId - Идентификатор родителя
   * @return {Function} - Функция, выполняющая отправку комментария
   */
  submitComment: (commentText, parentId) => {
    return async (dispatch, getState, services) => {
      const commentsParent = getState().comments.commentsParent
      dispatch({type: 'comments/submitComment-start'});
      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body: JSON.stringify({
              text: commentText,
              parent: parentId
            }),
        })
        if (res) {
          const res = await services.api.request({
            url: `/api/v1/comments?fields=items(_id,_type,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${commentsParent}`
          });
          dispatch({
            type: 'comments/submitComment-success',
            payload: {
              data: {
                comments: res.data.result.items,
                count:res.data.result.count
              },
              entityForComment: commentsParent
            }
          });
        }
      } catch (e) {
        dispatch({ type: 'comments/submitComment-error' });
      }
    }
  }
}
