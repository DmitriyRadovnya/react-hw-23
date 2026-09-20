# React + Vite + Redux Toolkit + createAsyncThunk

## Описание flow async thunk

1. После вызова thunk оправляется экшен со статусом pending
2. Выполняется асинхронная операция
3. Происходит завершение асинхронной операции с одним из двух статусов fulfilled или rejected

## Структура стейта

```javascript
state = {
  tasks: tasksReducer,
  filter: filterReducer,
  auth: authReducer,
};
```

## жизненный цикл createAsyncThunk

- pending - выполняется в момент вызова экшена, до завершения асинхронной операции
- fulfilled - выполняется в момент получения успешного результата вызова экшена
- rejected - выполняется в случае возникновения ошибки

## Что такое `pending`, `fulfilled`, `rejected`

Состояния асинхронного экшена которые обрабатываются в extraReducers для отслеживания жизненного цикла асинхронной операции

## Пример `extraReducers`

```javascript
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
```

## Почему этот подход удобнее ручных thunk actions

Такой подход автоматизирует создание экшенов для обработки состояний запроса: pending, fulfilled, rejected. Что как следствие уменьшает дублирование однообразного кода

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
