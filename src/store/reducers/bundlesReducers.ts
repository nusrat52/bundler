import { ActionType } from "../action-types";

import { Action } from "../action/index";

interface BundleState {
  [key: string]:
     {
        loading: boolean;
        code: string;
        err: string;
      }
 } 

const initialState: BundleState = {};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.BUNDLE_START:
      return {...state,
        [action.payload.celId]: {
          loading: true,
          code: "",
          err: "",
        },
      };
    case ActionType.BUNDLE_END:
      return { ...state,
        [action.payload.celId]: {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        },
      };

    default:
      return state;
  }
};

export default reducer;
