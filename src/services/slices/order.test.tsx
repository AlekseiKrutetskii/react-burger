import reducer, {
    sendOrder
} from './order'

describe('orderSlice', () => {
    describe('reducers', () => {
        const initialState = {
            order: null,
            loading: 'idle'
        }

        const payloadState = {
            success: true,
            name: 'string',
            order: {
                ingredients: [{
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
                }],
                _id: 'string',
                owner: {name: 'string',
                    email: 'string',
                    createdAt: 'string',
                    updatedAt: 'string',},
                status: 'string',
                name: 'string',
                createdAt: 'string',
                updatedAt: 'string',
                number: 1,
                price: 1,
            }
        }

        it('test initialState order', () => {
            expect(reducer(undefined, {type: ''})).toEqual(initialState);
        });

        it('sets the loading when sendOrder is pending', () => {
            const action = { type: sendOrder.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({ order: null, loading: 'loading' });
        });

        it('sets the order and loading when sendOrder is fulfilled', () => {
            const action = { type: sendOrder.fulfilled.type, payload: payloadState };
            const state = reducer(initialState, action);
            expect(state).toEqual({ order: payloadState, loading: 'idle' });
        });

        it('sets the loading when sendOrder is rejected', () => {
            const action = { type: sendOrder.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual(initialState);
        });
    });
});