import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    folder: 'public'
}

const currentFolderSlice = createSlice({
    name: 'currentFolder',
    initialState,
    reducers: {
        setStoryFolder: (state, action) => {
            state.folder = action.payload
        }
    }
})

export const { setStoryFolder } = currentFolderSlice.actions;
export const currentFolder = (state) => state.currentFolder.folder
export default currentFolderSlice.reducer 