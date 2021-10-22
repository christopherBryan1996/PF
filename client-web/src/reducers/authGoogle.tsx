import actions from "../actions_type/actions_types";

const initialState = {
  state: {},
};

export const authReducerG = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        state: {
          uid: action.payload.uid,
          name: action.payload.displayName,
          photoURL: action.payload.photoRUL,
        },
      };
    case actions.LOGIN_NORMAL:
      return {
        state: action.payload,
      };
    case actions.LOGOUT:
      return {
        state: {}
      };

    default:
      return state;
  }
};
