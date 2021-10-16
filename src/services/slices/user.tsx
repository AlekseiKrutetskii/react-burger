import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {push} from "connected-react-router";
import {getCookie, setCookie, fetchWithRefresh, deleteCookie} from '../../utils/utils'

export type AuthUser = {
    email: string,
    name: string,
}

interface UserState {
    data: AuthUser | null,
    loading: string
}

const initialState: UserState = {
    data: null,
    loading: 'idle'
}

export const sliceName = "user";

export const registerUser = createAsyncThunk(
    `${sliceName}/registerUser`,
    async (registerData:any, {dispatch}) => {
        const response = await fetch('https://norma.nomoreparties.space/api/auth/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: registerData
            })
        const data = await response.json()
        dispatch(push('/login'))
        return data
    }
)

export const loginUser = createAsyncThunk(
    `${sliceName}/loginUser`,
    async (loginData:any, {dispatch}) => {

        const response = await fetch('https://norma.nomoreparties.space/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: loginData
            })
        const data = await response.json()
        dispatch(push('/'))
        if (data.success)
            localStorage.setItem('refreshToken', data.refreshToken)
        return data
    }
)

export const logoutUser = createAsyncThunk(
    `${sliceName}/logoutUser`,
    async (logoutData:any, {dispatch}) => {

        const response = await fetch('https://norma.nomoreparties.space/api/auth/logout',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: logoutData
            })
        const data = await response.json()
        return data
    }
)


export const getUser = createAsyncThunk<AnyAction>(
    `${sliceName}/getUser`,
    async () => {
        const token = getCookie('accessToken');
        if (token) {
            const data = fetchWithRefresh('https://norma.nomoreparties.space/api/auth/user',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + getCookie('accessToken')
                    }
                })
            return data
        }
        return Promise.reject("Нет токена");
    }
)

// Then, handle actions in your reducers:
export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<AuthUser | null>) {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            console.log(action.payload);
            state.data = action.payload.user
            if (action.payload.accessToken !== undefined) {
                // Сохраняем токен в куку accessToken
                setCookie('accessToken', action.payload.accessToken.split('Bearer ')[1]);
            }
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log(action.payload);
            state.data = action.payload.user
            if (action.payload.accessToken !== undefined) {
                // Сохраняем токен в куку accessToken
                setCookie('accessToken', action.payload.accessToken.split('Bearer ')[1]);
            }
        });
        builder.addCase(getUser.pending, (state) => {
            state.loading = 'loading'
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            console.log(action.payload);
            state.data = action.payload.user
            state.loading = 'idle'
        });
        builder.addCase(getUser.rejected, (state) => {
            state.loading = 'idle'
        });
        builder.addCase(logoutUser.pending, (state, action) => {
            state.loading = 'loading'
        });
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            console.log(action.payload)
            if (action.payload.success) {
                localStorage.removeItem("refreshToken");
                deleteCookie('accessToken')
                state.data = null
            }
            state.loading = 'idle'
        });
        builder.addCase(logoutUser.rejected, (state) => {
            state.loading = 'idle'
        });

    },
})

const { actions, reducer } = user;
export const { setUserData } = actions;
export default reducer;