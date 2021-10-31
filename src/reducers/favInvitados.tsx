import { string } from "prop-types";
import actions from "../actions_type/actions_types";

const initialState = { 
  favoritosIds: [],
  favoritosInfo: []
};

export const favInvitado = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.GET_FAV_INVITADO:
        return {
            ...state,
            favoritosInfo: action.payload.filtrado ? action.payload.filtrado : []

        }
    case actions.FAV_INVITADO: 
      return {
        ...state,        
        favoritosIds: [action.payload, ...state.favoritosIds]
      }   
    case actions.DEL_FAV_INVITADO:
    return {
            ...state,        
            favoritosIds: state.favoritosIds.filter((fav: string) => fav !== action.payload)
          }  
    default:
    return state;
  }
};
