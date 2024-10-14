// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
    _id: string;
    name: string;
    email: string;
    photo: string;
}

export interface AuthState {
    tokens: null | string;
    user: null | TUser;
}

const initialState: AuthState = {
    tokens: null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.tokens = action.payload.tokens;
        },
        logout: (state) => {
            state.user = null;
            state.tokens = null;
        },
    },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
