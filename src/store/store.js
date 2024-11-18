import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authReducer";
import rootReducer from "./rootReducer";

const Store = configureStore({
reducer: rootReducer,
}); 

export default Store;