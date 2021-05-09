import { combineReducers } from "redux";
import users from "./users_reducer";
import tasks_reducer from "./tasks_reducer";
import auth from "./auth";
import error from "./errors";
import messages_reducer from "./messages_reducer";

export default  combineReducers({
    users,
    auth,
    error,
    messages_reducer,
    tasks_reducer
});