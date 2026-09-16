import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    loadTasks(state, action) {
      state.tasks = action.payload;
    },
    createTask(state, action) {
      state.tasks.push({
        ...action.payload,
        completed: false,
      });
    },
    editTask(state, action) {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.title = action.payload.title;
    },
    completeTask(state, action) {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    clearCompleted(state) {
      state.tasks = state.tasks.filter((task) => !task.completed);
    },
  },
});

export const {
  loadTasks,
  createTask,
  editTask,
  completeTask,
  deleteTask,
  clearCompleted,
} = tasksSlice.actions;

export default tasksSlice.reducer;
