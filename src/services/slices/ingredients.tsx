import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {apiURL} from "../../utils/data";
import {TEntity} from "../../types";

type TIngredientsState = {
    entities: Array<TEntity>,
    loading: string
}

type TLoadIngredients = {
    data: Array<TEntity>,
}

const initialState: TIngredientsState = {
    entities: [],
    loading: 'idle'
}

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async (userId, thunkAPI) => {
        const response = await fetch(apiURL+'ingredients')
        return response.json()
    }
)

// Then, handle actions in your reducers:
export const ingredients = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        builder.addCase(fetchIngredients.pending, (state) => {
            state.loading = 'loading'
        });
        builder.addCase(fetchIngredients.fulfilled, (state, action:PayloadAction<TLoadIngredients>) => {
            // Add user to the state array
            state.entities = action.payload.data
            state.loading = 'idle'
        });
        builder.addCase(fetchIngredients.rejected, (state) => {
            state.loading = 'idle'
        })
    },
})
