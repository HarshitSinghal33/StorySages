import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from './slice/UserAuthSlice';
import ProfileVisibilitySlice from "./slice/ProfileVisibilitySlice";
export const store = configureStore({
    reducer : {
        userAuth: userAuthSlice,
        profileVisibility: ProfileVisibilitySlice
    }
})