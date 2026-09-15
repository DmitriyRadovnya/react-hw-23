export const loggerMiddleware = (store) => (next) => (action) => {
  console.log(action.type);
  console.log(store.getState());
  const result = next(action);
  console.log(store.getState());
  return result;
};
