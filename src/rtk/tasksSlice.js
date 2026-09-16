import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/todoApi";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("api/todos");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка загрузки тасок");
    }
  },
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
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
