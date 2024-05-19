import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
    sendEmailVerification
} from "firebase/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, fireStoreDb } from "../../../Firebase";
import { useSetInitialData } from "../../Hooks/useSetInitialUserData";
import { doc, getDoc } from "firebase/firestore";
const { setData } = useSetInitialData()

export const createAccountAsync = createAsyncThunk('auth/createAccount', async ({ username, email, password }, { rejectWithValue }) => {
    try {
        const credential = await createUserWithEmailAndPassword(auth, email, password)
        await setData({ userUID: credential.user.uid, userName: username });
        await sendEmailVerification(credential.user)
        return credential.user.uid
    } catch (error) {
        return rejectWithValue(error.code)
    }
})

export const logOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
    try {
        await signOut(auth)
    } catch (error) {
        return rejectWithValue(error.code)
    }
})

export const changePasswordAsync = createAsyncThunk('auth/changePassword', async ({ email }, { rejectWithValue }) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        return rejectWithValue(error.code)
    }
}
);

export const googleSignupAsync = createAsyncThunk('auth/googleSignup', async (_, { rejectWithValue }) => {
    try {
        const googleAuthProvider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, googleAuthProvider);
        const { uid, displayName } = result.user
        const checkUserExists = await getDoc(doc(fireStoreDb, 'users', uid));
        if(!checkUserExists.exists()){
           await setData({ userUID: uid, userName: displayName }); 
        }
        return result.user.uid
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.code)
    }
})

export const loginAsync = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        const { uid } = credential.user;
        return uid
    } catch (error) {
        return rejectWithValue(error.code)
    }
})

const initialStates = {
    userUID: null,
    isLoading: false,
    isGoogleAuthLoading: false
}

const userAuthSlice = createSlice({
    name: 'authSlice',
    initialState: initialStates,
    reducers: {
        setCurrentUserUID: (state, action) => {
            state.userUID = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAccountAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAccountAsync.fulfilled, (state, action) => {
                state.userUID = action.payload;
                state.isLoading = false;
            })
            .addCase(createAccountAsync.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(loginAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.userUID = action.payload;
                state.isLoading = false;
            })
            .addCase(loginAsync.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.userUID = null;
                state.isLoading = false;
            })
            .addCase(logOut.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(changePasswordAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changePasswordAsync.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(changePasswordAsync.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(googleSignupAsync.pending, (state) => {
                state.isGoogleAuthLoading = true;
            })
            .addCase(googleSignupAsync.fulfilled, (state, action) => {
                state.userUID = action.payload
                state.isGoogleAuthLoading = false;
            })
            .addCase(googleSignupAsync.rejected, (state) => {
                state.isGoogleAuthLoading = false;
            })
    },
})

export const { setCurrentUserUID } = userAuthSlice.actions;
export const uid = (state) => state.userAuth.userUID;
export const isLoading = (state) => state.userAuth.isLoading;
export const isGoogleAuthLoading = (state) => state.userAuth.isGoogleAuthLoading;
export default userAuthSlice.reducer