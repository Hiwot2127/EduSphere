import { applyMiddleware, combineReducers, createStore } from "redux";
import { cartReducer } from "./cart/reducer";
import { authReducer } from "./login/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

const loggerMiddleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch);
  }
  next(action);
};

export const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware)
);
