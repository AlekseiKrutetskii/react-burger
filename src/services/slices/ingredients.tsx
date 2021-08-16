import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
const api = 'https://norma.nomoreparties.space/api/ingredients';

interface IngredientsState {
    entities: any,
    loading: string
}

const initialState: IngredientsState = {
    entities: [],
    loading: 'idle'
}

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async (userId, thunkAPI) => {
        const response = await fetch(api)
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
        builder.addCase(fetchIngredients.fulfilled, (state, action) => {
            // Add user to the state array
            state.entities = action.payload.data
            state.loading = 'idle'
        });
        builder.addCase(fetchIngredients.rejected, (state) => {
            state.loading = 'idle'
        })
    },
})