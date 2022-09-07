import { combineReducers } from "redux"; 
import auth from "./auth";
import blogs from "./blogs";
export default combineReducers({
    auth,
    blogs
})