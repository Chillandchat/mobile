//Importing packages
import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import usernameReducer from "./usernameReducer";

//Combine reducers
const reducers: any = combineReducers({
  username: usernameReducer,
  login: loginReducer,
});

//Export reducers
export default reducers;

//Export reducers type
export type RootState = ReturnType<typeof reducers>;
