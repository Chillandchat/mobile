// Importing packages
import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import usernameReducer from "./usernameReducer";
import routerReducer from "./routerReducer";

// Combine reducers
const reducers: any = combineReducers({
  username: usernameReducer,
  login: loginReducer,
  router: routerReducer
});

// Export reducers
export default reducers;

// Export reducers type
export type RootState = ReturnType<typeof reducers>;
