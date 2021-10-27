import actions from "../actions_type/actions_types";
import { Iusers } from "../interfaces/interfaces"

const initialState:Iusers = {
  users: []
};

export const usersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.GET_USERS:
        return {
        ...state,
        users: action.payload,
    };
    default:
    return state;
  }
};