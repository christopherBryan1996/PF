import actions from "../actions_type/actions_types"


export const authReducerG = (state = {}, action: any) => {

    switch (action.type) {
        case actions.LOGIN:

            return {

                uid: action.payload.uid,
                name: action.payload.displayName,

            }
        case actions.LOGIN_NORMAL:
            return {
                ...state,
                state: action.payload
                // uid: action.payload.uid,
                // name: action.payload.name,
                // image: action.payload.image,
                // token: action.payload.token
            }



        default:
            return state;
    }



}