import api from "../../api/todoApi";

export const getTasks = () => {
  return async (dispatch) => {
    dispatch({ type: "GET_TASKS" });
    try {
      const tasks = await api.get("/api/todos");
      dispatch({ type: "SUCCESS_TASKS", payload: tasks.data.data });
    } catch (error) {
      dispatch({ type: "ERROR_TASKS", payload: error });
    }
  };
};
