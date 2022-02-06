import cellReducer from "./cellsReducers";

import bundle from "./bundlesReducers"
import { combineReducers } from "redux";


const reducers = combineReducers({
   cells: cellReducer,
   bundle
})


export default reducers;
 

export type RootState = ReturnType<typeof reducers>

 