import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithRedirect
} from "firebase/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../Firebase";
import { fireStoreDb } from "../../../Firebase";
import { doc, collection, writeBatch, serverTimestamp } from "firebase/firestore";

export const createAccountAsync = createAsyncThunk('auth/createAccount', async ({ username, email, password }, { rejectWithValue }) => {
    try {
        const credential = await createUserWithEmailAndPassword(auth, email, password)
        const { uid } = credential.user;
        const userDocRef = doc(fireStoreDb, 'users', uid);
        const privateDataDocRef = doc(collection(userDocRef, 'private'), 'privateData');
        const userData = {
            joinedData: serverTimestamp(),
            name: username,
            description: 'Hey I am now on storySage',
            profile: 'https://img.freepik.com/free-vector/cute-teddy-bear-waving-hand-cartoon-icon-illustration_138676-2714.jpg',
            id:uid
        }
        const privateData = {
            saved:[],
            following:[],
            liked:[]
        };
        const batch = writeBatch(fireStoreDb);
        batch.set(userDocRef, userData);
        batch.set(privateDataDocRef, privateData);
        await batch.commit();
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

export const changePasswordAsync = createAsyncThunk('auth/changePassword', async ({ userEmail }, { rejectWithValue }) => {
    try {
        await sendPasswordResetEmail(auth, userEmail);
    } catch (error) {
        return rejectWithValue(error.code)
    }
}
);

export const googleSignupAsync = createAsyncThunk('auth/googleSignup', async (_, { rejectWithValue }) => {
    try {
        const googleAuthProvider = new GoogleAuthProvider()
        await signInWithRedirect(auth, googleAuthProvider)
    } catch (error) {
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
    isLoading: false
}

const userAuthSlice = createSlice({
    name: 'authSlice',
    initialState: initialStates,
    reducers: {
        setCurrentUser: (state, action) => {
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
    },
})

export const { setCurrentUser } = userAuthSlice.actions;
export const userUID = (state) => state.userAuth.userUID;
export const isLoading = (state) => state.userAuth.isLoading;
export default userAuthSlice.reducer