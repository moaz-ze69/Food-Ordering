import { combineReducers } from "redux";

import cartReducer from "./cart/cartSlice";
import productsReducer from "./menu/productsSlice";
import addressReducer from "./userInfo/addressSlice";
import authReducer from "./auth/authSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  address: addressReducer,
  user: authReducer,
});

export default rootReducer;
