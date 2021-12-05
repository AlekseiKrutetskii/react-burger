import reducer, {
    fetchIngredients
} from './ingredients';

describe('ingredientsSlice', () => {
    describe('reducers', () => {
        const initialState = { entities: [], loading: 'idle' }
        const payloadState = {
            calories: 1,
            carbohydrates: 1,
            fat: 1,
            image: 'string',
            image_large: 'string',
            image_mobile: 'string',
            name: 'string',
            price: 1,
            proteins: 1,
            type: 'string',
            __v: 1,
            _id: 'string',
        }

        it('test initialstate ingredients', () => {
            expect(reducer(undefined, {type: ''})).toEqual(initialState);
        });

        it('sets fetching true when fetchList is pending', () => {
            const action = { type: fetchIngredients.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                entities: [],
                loading: 'loading'
            });
        });

        it('sets the id and list when fetchList is fulfilled', () => {
            const action = { type: fetchIngredients.fulfilled.type, payload: { data: [payloadState] }};
            const state = reducer(initialState, action);
            expect(state).toEqual({ entities: [payloadState], loading: 'idle' });
        });

        it('sets fetching false when fetchList is rejected', () => {
            const action = { type: fetchIngredients.rejected.type};
            const state = reducer(initialState, action);
            expect(state).toEqual(initialState);
        });

    });

});