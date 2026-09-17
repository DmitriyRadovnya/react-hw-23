# React + Vite + RTK Query

## Cтруктурa API slice

```javascript
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  // Базовая настройка запросов (базовый URL, заголовки)
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api`,
    prepareHeaders: (headers) => {
      const token = import.meta.env.VITE_BASE_TOKEN;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Tasks", "CurrentTask"],
  // Конечные точки (запросы и мутации)
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/todos",
      transformResponse: (response) => response.data,
      providesTags: ["Tasks"],
    }),
    getTask: builder.query({
      query: (id) => ({
        url: `/todos/${id}`,
        transformResponse: (response) => response,
        providesTags: ["CurrentTask"],
        keepUnusedDataFor: 5,
      }),
    }),
    createTask: builder.mutation({
      query: (newTask) => ({
        url: "/todos",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    completeTask: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: ["Tasks"],
    }),
    editTask: builder.mutation({
      query: ({ id, newTitle }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { title: newTitle },
      }),
    }),
  }),
});

// Автоматически сгенерированные хуки для компонентов
export const {
  useGetTasksQuery,
  useLazyGetTaskQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useCompleteTaskMutation,
  useEditTaskMutation,
} = api;
```

## Список endpoints:

- getTasks
- getTask
- createTask
- deleteTask
- completeTask
- editTask

## Как работают tags;

Они связывают запросы и мутации, чтобы rtk query понял под каким ключом необходимо обновить(перезапросить) данные в кеше после изменений на сервере.

- providesTags - кеширует данные под тегом
- invalidatesTags - обновляет данные в кеше после мутации

## Чем RTK Query отличается от `createAsyncThunk`

RTK query позволяет не писать шаблонный код для простых CRUD запросов, что упрощает работу с API, в то время как createAsyncThunk более низкоуровневый подход, для болле сложных операций и запросов которые невозможно описать структурой эндроинтов

# React + Vite + Redux Toolkit

## Cравнение структуры классического Redux и Redux Toolkit

- ### redux - actions => reducer => store
- ### RTK - slice(actions + reducer) => store

## Что делает `configureStore`?

- Создает стор
- Комбинирует редюсеры в один корневой
- Подключает middleware + thunk
- По умолчанию включает redux DevTools

## Что делает `createSlice`

- Позволяет создавать отдельные срезы приложения
- Принимает объект редьюсеров и на их основе автоматически генерирует экшены
- Разрешает мутировать состояние напрямую

## Cколько примерно строк кода удалось убрать?

Учитывая что приложение небольшое, а так же создание отдельного слайса для фильтра и как следствие создания селектора, сократить удалось на ~ 20 строк

# React + Vite + Redux

## Cхема файлов Redux

![Cхема файлов Redux](./src/assets/image.png)

## Пример Action

```javascript
export const deleteTask = (id) => ({ type: "DELETE", payload: id });
```

## Пример Reducer

```javascript
const initialState = {
  allTasks: [],
  filterMode: "FILTER_ALL",
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE":
      return {
        ...state,
        allTasks: state.allTasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};
```

## Про Provider, useSelector, useDispatch

- Provider - предоставляет доступ к стору дочерним компонентам
- useSelector - возвращает выбранную часть состояния, и подписывает компонент на его изменения
- useDispatch - возвращает функцию dispatch для отправки экшенов в стор
