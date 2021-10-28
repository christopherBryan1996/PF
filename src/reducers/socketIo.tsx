import actions from "../actions_type/actions_types";

const initialState = {
  socket: null,
  notificacionesOffL: []

};

export const socketIoConfig = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.SOCKET_IO_CONFIG:
      return {
        socket: action.payload.socket,
        notificacionesOffL: action.payload.notificacionesOffL
      };
    case actions.CLEAN_NOTIFICATIONS:
      return {
        ...state,
        notificacionesOffL:[]
    }
    default:
      return state;
  }
};
