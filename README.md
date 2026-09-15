# React + Vite + Redux + redux-thunk

## Зачем нужен middleware?

Дает возможность манипулировать экшеном до попадания его в редюсер, тем самым влиять на изменения стора уже после того как экшен был задиспатчен. А так же выполнять какие-либо действия (аналитика, запросы, остановить экшен) во время выполнения функции

## Как работает `redux-thunk`

1. Позволяет методу dispatch принимать функцию которая в параметрах принимает dispatch & getState, автомачитески вызывает ее. Внутри этой функции мы можем сделать запрос и после получения ответа вызвать dispatch и передать уже объект в качестве экшена, который попадет в редюсер
2. С объектами dispatch имеет привычное поведение, прокидывает их сразу в редюсер

## Пример моего middleware

```javascript
export const loggerMiddleware = (store) => (next) => (action) => {
  console.log(action.type);
  console.log(store.getState());
  const result = next(action);
  console.log(store.getState());
  return result;
};
```

## Почему side effects не пишут прямо в reducer?

- Потому что reducer должен быть чистой функцией, в которой исключены любые побочные эффекты!
- При попытке вызвать функцию fetch, редюсер вернет промис, а не обновленное состояние так как является синхронной функцией, которая в таком случае просто сломает redux
- redux devTool каждый раз будет отправлять реальные запросы на сервер, при перематывании истории изменения стора, что так же сделает отладку невозможной

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
