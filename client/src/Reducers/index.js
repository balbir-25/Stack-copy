import { combineReducers } from "redux";
import AuthReducer from "./Auth";
import CurrentUserReducer from "./CurrentUser";
import QuestionsReducer from "./Questions";
import UsersReducer from "./Users";

export default combineReducers({
  AuthReducer,
  CurrentUserReducer,
  QuestionsReducer,
  UsersReducer,
});
