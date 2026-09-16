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
