export const initialState = {
  data: {comments: [], count: 0},
  commentsParent: '', //родитель, для которого загружены комментарии
  entityForComment: '', //комментируемая сущность
  waiting: false //маркер подгрузки комментариев
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return {...initialState, waiting: true};

    case "comments/load-success":
      return {...state, ...action.payload, waiting: false};

    case "comments/load-error":
      return {...state, data: {}, waiting: false}; //@todo текст ошибки сохранять?

    case "comments/selectEntityForComment":
      return {...state, ...action.payload};

    case "comments/resetEntityForComment":
      return {...state, ...action.payload};

    case "comments/submitComment-start":
      return {...state, waiting: true}

    case "comments/submitComment-success":
      return {...state, ...action.payload, waiting: false}

    case "comments/submitComment-error":
      return {...state, waiting: false}

    default:
      return state;
  }
}

export default reducer;
