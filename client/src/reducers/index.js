import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";

export default combineReducers({
  item: itemReducer,
  cart: cartReducer,
  auth: authReducer
});
