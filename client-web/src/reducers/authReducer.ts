import {types} from '../types/types';

const initialState = {
    checking: true
}

export const authReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false
            }
    
        default:
            return state;
    }
}
