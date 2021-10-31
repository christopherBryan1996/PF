import axios from "axios";
import actions from "../actions_type/actions_types";
import URLrequests from "../components/constanteURL";
import socketIOClient from "socket.io-client";
import { INotificaciones } from "../interfaces/interfaces"


/********PASOS PARA CREAR UNA ACTION NUEVA***********
 1-> carpeta Interfaces: añadir a la interface IActions el nombre de la action y el tipo String
 2-> carpeta actions_type: añadir al objeto actions una la nueva action 
 3-> carpeta actions: crear la nueva action y en type colocar action.NOMBRE_DE_LA_ACTION
 4-> reducer correspndiente: en case colocar actions.NOMBRE_DE_LA_ACTION
**********************/

export function llenarCoordenadas(data: string[]) {

// export function getEvents() {
//     return async function (dispatch: any) {
//         const res = await axios.get("https://api-fest.herokuapp.com/events");
//         dispatch({
//             type: actions.GET_EVENTS,
//             payload: res.data,
//         });
//     };
  console.log("llego action llenarCoordenadas");
  return async function (dispatch: any) {
    return dispatch({ type: actions.LLENAR_COORDENADAS, payload: data });
  };
  
}

export function getUsers() {
  return async function (dispatch: any) {
    const res = await axios.get(`${URLrequests}api/users`);
    dispatch({
      type: actions.GET_USERS,
      payload: res.data,
    });
  };
}

export function getEvents() {
  return async function (dispatch: any) {
    const res = await axios.get(`${URLrequests}events`);
    dispatch({
      type: actions.GET_EVENTS,
      payload: res.data,
    });
  };
}

export function getEvent(eventId: any) {
  return async function (dispatch: any) {
    const res = await axios.get(`${URLrequests}events/${eventId}`);
    dispatch({
      type: actions.GET_EVENT,
      payload: res.data,
    });
  };
}

export function getEventosAsistir(uid: any) {
  return async function (dispatch: any) {
    const res = await axios.get(`${URLrequests}api/users/gettasks/${uid}`);
    dispatch({
      type: actions.GET_EVENTOSASISTIR,
      payload: res.data,
    });
  };
}

export const filtroPrecio = (state: any) => {
  return {
    type: actions.FILTRO_PRECIO,
    payload: state,
  };
};

export const getAsistentes = (id: string) => {
 return async function (dispatch: any) {
    const res = await axios.get(`${URLrequests}events/assistans/${id}`);
    dispatch({
      type: actions.GET_ASISTENTES,
      payload: res.data,
    });
  };
};

export const userAsistiraEvento = (uid:any, eventID: any) => {
  return async function (dispatch:any){
    const res = await axios.patch(`${URLrequests}api/users/addeventstoassist/${uid}/${eventID}`);
    dispatch({
      type: actions.USER_ASISTIRA_EVENTO,
      payload: res.data
    })
  }
}

export const login = (data: any) => ({
  type: actions.LOGIN,
  payload: data
});


    
export const loginNormal = (data: any) => {  
  return {
    type: actions.LOGIN_NORMAL,
    payload: data,
  };
};


export const logout = (socket: any) => {
  socket.disconnect()
  return {
    type: actions.LOGOUT,
  };
}  


export const getFavorites = (id: any) => {
  return async function (dispatch: any) {
    const res = await axios.get(
      `${URLrequests}api/users/favouritesevents/${id}`
    );
    dispatch({
      type: actions.GET_FAVORITES,
      payload: res.data,
    });
  };
};

export const getUsersEvents = (id:any) => {
  return async function (dispatch: any) {
    console.log("llego al action")
    const res = await axios.get(`${URLrequests}api/users/userevents/${id}`);
    dispatch({
      type: actions.GET_USERSEVENTS,
      payload: res.data,
    });
  };
}
export const addFavoriteEvent = (uid:any, eventID: any) => {
  return async function (dispatch: any){
    const res = await axios.patch(`${URLrequests}api/users/addfavourite/${uid}/${eventID}`);
    dispatch({
      type: actions.ADD_FAVORITE_EVENT,
      payload: res.data
    })
  }
}

export const filtroFavoritos = (state: any) => {
  return {
    type: actions.FILTRO_FAVORITOS,
    payload: state,
  };
};

export const deleteFavoriteEvent = (id: any, eventid: any) => {
  return async function (dispatch: any) {
    await axios.patch(`${URLrequests}api/users/removefavourite/${id}/${eventid}`);
    dispatch({
      type: actions.DELETE_FAVORITE_EVENT,
    });
  }
}

export const socketConfig = (uid: string, usuario: string) => {
  const socket = socketIOClient(URLrequests,{forceNew: true})
  const data = {uid, usuario}
  socket.emit("newUser",data);
  return function (dispatch: any) {
    dispatch({
      type: actions.SOCKET_IO_CONFIG,
      payload: socket
    });
  }
}

export const resetNotifications = () => ({
  type: actions.RESET_NOTIFICATIONS,
})


export const getNotifOffLine = (uid: string) => {
   return async function (dispatch: any) {
    const res: any = await axios.get(`${URLrequests}notifications/${uid}`);
    dispatch({
      type: actions.GET_NOTIF_OFFLINE,
      payload: res.data
    });
  }

}

export const cleanNotifications = () => ({
  type: actions.CLEAN_NOTIFICATIONS,
});

export const admin = (state: any) => {
  return {
    type: actions.ADMIN,
    payload: state,
  };
};
export const addFavoriteInvitado = (id : string) => {
  return function (dispatch: any) {
    dispatch({
      type: actions.FAVORITOS_INVITADO,
      payload: id
    });
  }

}

export const saveNotifications = (notif: any) => {
   return function (dispatch: any) {
    dispatch({
      type: actions.SAVE_NOTIFICATIONS,
      payload: notif
    });
  }
}
