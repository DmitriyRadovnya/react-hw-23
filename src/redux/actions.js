export const loadTasks = (oldTasks) => ({ type: "LOAD", payload: oldTasks });
export const createTask = (data) => ({ type: "CREATE", payload: data });
export const editTask = (data) => ({ type: "EDIT", payload: data });
export const completeTask = (id) => ({ type: "COMPLETE", payload: id });
export const deleteTask = (id) => ({ type: "DELETE", payload: id });
export const clearCompletedTasks = () => ({ type: "CLEAR_COMPLETED" });
