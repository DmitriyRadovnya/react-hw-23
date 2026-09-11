const initialState = {
  allTasks: [],
  filterMode: "FILTER_ALL",
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD":
      return {
        allTasks: action.payload.map((task) => ({ ...task, isVisible: true })),
        filterMode: "FILTER_ALL",
      };
    case "CREATE":
      return {
        ...state,
        allTasks: [
          ...state.allTasks,
          {
            id: action.payload.id,
            title: action.payload.title,
            isDone: false,
            isVisible: state.filterMode === "FILTER_COMPLETED" ? false : true,
          },
        ],
      };

    case "EDIT":
      return {
        ...state,
        allTasks: state.allTasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, title: action.payload.title }
            : task,
        ),
      };

    case "COMPLETE":
      return {
        ...state,
        allTasks: state.allTasks.map((task) =>
          task.id === action.payload
            ? {
                ...task,
                isDone: !task.isDone,
                isVisible:
                  state.filterMode === "FILTER_ALL" ? true : !task.isVisible,
              }
            : task,
        ),
      };

    case "DELETE":
      return {
        ...state,
        allTasks: state.allTasks.filter((task) => task.id !== action.payload),
      };
    case "CLEAR_COMPLETED":
      return {
        ...state,
        allTasks: state.allTasks.filter((task) => !task.isDone),
      };
    case "FILTER_ALL":
      return {
        ...state,
        filterMode: action.type,
        allTasks: state.allTasks.map((task) => ({ ...task, isVisible: true })),
      };
    case "FILTER_ACTIVE":
      return {
        ...state,
        filterMode: action.type,
        allTasks: state.allTasks.map((task) =>
          !task.isDone
            ? { ...task, isVisible: true }
            : { ...task, isVisible: false },
        ),
      };
    case "FILTER_COMPLETED":
      return {
        ...state,
        filterMode: action.type,
        allTasks: state.allTasks.map((task) =>
          task.isDone
            ? { ...task, isVisible: true }
            : { ...task, isVisible: false },
        ),
      };
    default:
      return state;
  }
};
