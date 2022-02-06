import { applyMiddleware, createStore, compose } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";
import { ActionType } from "./action-types/index";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(thunk))
);






store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: "code",
  },
});
store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: "text",
  },
});
store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: "code",
  },
});