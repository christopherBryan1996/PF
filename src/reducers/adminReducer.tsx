import actions from "../actions_type/actions_types";

const initialState = {
    admin: 1
}

export const adminReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case actions.ADMIN:
            return {
                ...state,
                admin: action.payload,
               
            }    
        default:
            return state;
    }
}

