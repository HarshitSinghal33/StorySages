import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from './slice/AuthSlice';
import CurrentFolderSlice from "./slice/CurrentFolderSlice";
export const store = configureStore({
    reducer : {
        userAuth: userAuthSlice,
        currentFolder: CurrentFolderSlice
    }
})