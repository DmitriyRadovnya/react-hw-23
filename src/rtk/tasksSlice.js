import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/todoApi";

const initialState = {
  tasks: [],
  loading: {
    load: false,
    create: false,
    delete: false,
    edit: false,
    complete: false,
  },
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

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (title, thunkAPI) => {
    try {
      const response = await api.post("api/todos", { title });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка создания таски");
    }
  },
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ id, title }, thunkAPI) => {
    try {
      const response = await api.patch(`api/todos/${id}`, {
        title,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка редактирования таски");
    }
  },
);

export const completeTask = createAsyncThunk(
  "tasks/completeTask",
  async (id, thunkAPI) => {
    try {
      await api.patch(`api/todos/${id}/toggle`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка смены статуса таски");
    }
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      await api.delete(`api/todos/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка удаления таски : ", id);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.error = null;
        state.loading.load = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading.load = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading.load = false;
        state.error = action.payload;
      });
    builder
      .addCase(createTask.pending, (state) => {
        state.loading.create = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
        state.loading.create = false;
      })
      .addCase(createTask.rejected, (state) => {
        state.loading.create = false;
      });
    builder
      .addCase(deleteTask.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.loading.delete = false;
      })
      .addCase(deleteTask.rejected, (state) => {
        state.loading.delete = false;
      });
    builder
      .addCase(editTask.pending, (state) => {
        state.loading.edit = true;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.id === action.payload.id);
        if (task) task.title = action.payload.title;
        state.loading.edit = false;
      })
      .addCase(editTask.rejected, (state) => {
        state.loading.edit = false;
      });
    builder
      .addCase(completeTask.pending, (state) => {
        state.loading.complete = true;
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.id === action.payload);
        if (task) task.completed = !task.completed;
        state.loading.complete = false;
      })
      .addCase(completeTask.rejected, (state) => {
        state.loading.complete = false;
      });
  },
});

export const { loadTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
