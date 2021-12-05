import reducer, {
    current
} from './current';

describe('currentSlice', () => {
    describe('reducers', () => {
        const initialState = { cur: null }
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

        it('test initialstate constructor', () => {
            expect(reducer(undefined, {type: ''})).toEqual(initialState);
        });

        it('sets the cur to payload', () => {
            const action = { type: current.actions.add, payload: payloadState  };
            const state = reducer(initialState, action);
            expect(state).toEqual({cur: payloadState});
        });

        it('sets the cur to null', () => {
            const action = { type: current.actions.del };
            const state = reducer(initialState, action);
            expect(state).toEqual({ cur: null });
        });
    });

});