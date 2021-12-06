import reducer, {
    constructors
} from './constructors';

describe('constructorsSlice', () => {
    describe('reducers', () => {
        const initialState = { items: [], count: [] }
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
            _id: '123',
            handleCloseModal: ()=>{},
            customId: 'string',
        }

        const payloadStateBun = {
            calories: 1,
            carbohydrates: 1,
            fat: 1,
            image: 'string',
            image_large: 'string',
            image_mobile: 'string',
            name: 'string',
            price: 1,
            proteins: 1,
            type: 'bun',
            __v: 1,
            _id: '1234',
            handleCloseModal: ()=>{},
        }

        it('test initialstate constructor', () => {
            expect(reducer(undefined, {type: ''})).toEqual(initialState);
        });

        it('add items in constructor type not bun', () => {
            const action = { type: constructors.actions.add, payload: payloadState  };
            const state = reducer(initialState, action);
            expect(state).toEqual({items: [payloadState], count: [{_id: '123', qty: 1}]});
        });

        it('add items in constructor type bun', () => {
            const action = { type: constructors.actions.add, payload: payloadStateBun  };
            const state = reducer(initialState, action);
            expect(state).toEqual({items: [payloadStateBun], count: [{_id: '1234', qty: 2}]});
        });

        it('sets the cur to null', () => {
            const action = { type: constructors.actions.del, payload: {item: payloadState} };
            const state = reducer({items: [payloadState], count: [{ _id: '123', qty: 1 }]}, action);
            expect(state).toEqual({items: [], count: [{ _id: '123', qty: 0 }]});
        });

        it('update items state in constructor', () => {
            const action = { type: constructors.actions.update, payload: [payloadState] };
            const state = reducer(initialState, action);
            expect(state).toEqual({items: [payloadState], count: []});
        });

        it('sets the constructors to initialState', () => {
            const action = { type: constructors.actions.clear };
            const state = reducer(initialState, action);
            expect(state).toEqual(initialState);
        });
    });

});