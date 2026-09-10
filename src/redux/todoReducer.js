const initialState = [];

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD":
      return [...action.payload];
    case "CREATE":
      return [
        ...state,
        {
          id: action.payload.id,
          title: action.payload.title,
          isDone: false,
          isVisible: true,
        },
      ];

    case "EDIT":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, title: action.payload.title }
          : task,
      );

    case "COMPLETE":
      return state.map((task) =>
        task.id === action.payload ? { ...task, isDone: !task.isDone } : task,
      );

    case "DELETE":
      return state.filter((task) => task.id !== action.payload);
    case "CLEAR_COMPLETED":
      return state.filter((task) => !task.isDone);
    default:
      return state;
  }
};
