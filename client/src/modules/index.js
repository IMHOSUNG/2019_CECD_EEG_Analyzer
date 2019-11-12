import { combineReducers } from "redux";
import overview from "./overview";
import gender from "./gender";
import age from "./age";

const rootReducer = combineReducers({
  overview,
  gender,
  age
});

export default rootReducer;
