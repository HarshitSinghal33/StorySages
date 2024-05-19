import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    storiesVisibility: 'public'
}

const profileVisibilitySlice = createSlice({
    name: 'visibility',
    initialState,
    reducers: {
        setStoriesVisibility: (state, action) => {
            state.storiesVisibility = action.payload
        }
    }
})

export const { setStoriesVisibility } = profileVisibilitySlice.actions;
export const currentVisibility = (state) => state.profileVisibility.storiesVisibility
export default profileVisibilitySlice.reducer 