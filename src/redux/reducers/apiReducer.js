const initialState = {
  tasks: null,
  loading: false,
  error: null,
};

export const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TASKS":
      return { ...state, loading: true, error: null };
    case "SUCCESS_TASKS":
      return { ...state, loading: false, tasks: action.payload };
    case "ERROR_TASKS":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
