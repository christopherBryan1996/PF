import actions from "../actions_type/actions_types";
import { Iventas } from "../interfaces/interfaces"

const initialState:Iventas = {
  ventas: []
};

export const ventasReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.GET_VENTAS:
        return {
        ...state,
        ventas: action.payload,
    };
    default:
    return state;
}
};