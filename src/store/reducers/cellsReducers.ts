import { ActionType } from "../action-types";
import { Action } from "../action";
import { Cell } from "../cell";

interface CellState {
  loading: boolean;
  error: null | string;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

const reducer = (
  state: CellState = initialState,
  action: Action
): CellState => {
  switch (action.type) {
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex >= 0 && targetIndex < state.order.length) {
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
      }

      return { ...state, order: [...state.order] };
    case ActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        content: "",
        id: randomId(),
        type: action.payload.type,
      };

      state.data[cell.id] = cell;
      const newId = state.order.findIndex((id) => id === action.payload.id);

      if (newId < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(newId + 1, 0, cell.id);
      }
      return { ...state, order: [...state.order], data: { ...state.data } };
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return { ...state, data: { ...state.data } };
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      return { ...state, data: { ...state.data }, order: [...state.order] };
    default:
      return state;
  }
};
export default reducer;
