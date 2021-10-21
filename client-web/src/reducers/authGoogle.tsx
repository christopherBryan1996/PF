import actions from "../actions_type/actions_types"


export const authReducerG = (state = {}, action: any) => {

    switch (action.type) {
        case actions.LOGIN:

            return {

                uid: action.payload.uid,
                name: action.payload.displayName,

            }
        case actions.LOGIN:

            return {}


        default:
            return state;
    }



}