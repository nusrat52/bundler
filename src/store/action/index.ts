import { ActionType } from "../action-types";
import { Celltypes } from "../cell";



export type Direction = "up" | "down"




interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string|null;
    type: Celltypes;
  };
}

interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}


interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    celId:string
  }
}




interface BundleEndAction{
  type: ActionType.BUNDLE_END;
  payload: {
    celId: string;
    bundle: {
      code: string;
      err:string
    }
  }
}











export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleEndAction
  | BundleStartAction
