import actions from "../actions_type/actions_types";

const initialState = {
  socket: null
};

export const socketIoConfig = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.SOCKET_IO_CONFIG:
      return {
        ...state,
        socket: action.payload
      };
    default:
      return state;
  }
};
