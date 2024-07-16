
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import httpApi from '../helper/httpApi.js'

const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
}
const BASEURL = 'http://localhost:3000';
export const register = createAsyncThunk(
    'auth/register',
    async (newUser, { rejectWithValue }) => {
        try {
            const response = await httpApi.post(`${BASEURL}/users/sign-up`, {
                "email": newUser.email,
                "fName": newUser.name,
                "lName": newUser.name,
                "phone": newUser.phone,
                "password": newUser.password
            }
        )
            console.log(response);
            if (response.data.isError) {
                return rejectWithValue(response.data.message)
            } else {
                return response.data
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue(error)
        }
    },
)

export const login = createAsyncThunk(
    'auth/login',
    async (user, { rejectWithValue }) => {
        try {
            const response = await httpApi.post(`${BASEURL}/users/sign-in`, {
                "email": user.email,
                "password": user.password
            })
            console.log(response);

            return response.data
        } catch (error) {
            console.log(error);
            return rejectWithValue(error)
        }
    },
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // register: (state, action) => {
        //     state.user = action.payload
        // },
        // login: (state, action) => {
        //     state.isLoggedIn = true
        // },
        logout: (state, action) => {
            localStorage.clear();
            state.user = null
            state.token = null
            state.isLoggedIn = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.data;
            state.isLoggedIn = true;
        })
        // When our request is rejected:
        // - store the 'rejected' state as the status for the corresponding pokemon name
        builder.addCase('auth/register/rejected', (state, action) => {
            alert(action.payload)
        })

        builder.addCase('auth/login/fulfilled', (state, action) => {
            localStorage.setItem("ff_token", action.payload.data.token.token)
            state.user = action.payload.data.user;
            state.token = action.payload.data.token;
            state.isLoggedIn = true;
        })
    }
})

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions

export default authSlice.reducer