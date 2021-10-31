import actions from "../actions_type/actions_types";

const initialState = { 
  OffLinenotif: [],
  notifLeidas: []
};

export const notificaciones = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.GET_NOTIF_OFFLINE: 
      return {
        ...state,        
        OffLinenotif: action.payload
      }     
    case actions.RESET_NOTIFICATIONS:
      return {
        ...state,
        OffLinenotif: [],
        notifLeidas: []
    }
    case actions.SAVE_NOTIFICATIONS:
      let totalNotif = action.payload.concat(state.notifLeidas)
      return {
        ...state,
        notifLeidas: totalNotif
    }
    default:
      return state;
  }
};
