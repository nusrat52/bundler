import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Direction } from "../action";
import { Celltypes } from "../cell";
import Bundler from "../../bundler/bundler";
import { Action } from "../action/index";
export const UpdateCellAction = (id: string, content: string) => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const DeleteCellAction = (id: string) => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const MoveCellAction = (id: string, direction: Direction) => {
  return {
    type: ActionType.MOVE_CELL,
    payload: { id, direction },
  };
};

export const InsertCellAfterAction = (id: string | null, type: Celltypes) => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type,
    },
  };
};

export const BundleStartAction = (celId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        celId,
      },
    });

    const result = await Bundler(input);

    dispatch({
      type: ActionType.BUNDLE_END,
      payload: {
        celId,
        bundle: result,
      },
    });
  };
};
