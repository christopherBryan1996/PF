import { IActions } from "../interfaces/interfaces";

const actions : IActions = {
    LLENAR_COORDENADAS: 'LLENAR_COORDENADAS',
    GET_EVENTS: 'GET_EVENTS',
    FILTRO_PRECIO: 'FILTRO_PRECIO',
    GET_ASISTENTES: 'GET_ASISTENTES',
    GET_EVENT: 'GET_EVENT',
    LOGIN: 'LOGIN_GOOGLE',
    GET_FAVORITES: "GET_FAVORITES",
    FILTRO_FAVORITOS: "FILTRO_FAVORITOS",
    GET_USERSEVENTS:"GET_USERSEVENTS",
    LOGIN_NORMAL: "LOGIN_NORMAL",
    LOGOUT: 'LOGOUT',
    DELETE_FAVORITE_EVENT: "DELETE_FAVORITE_EVENT",
    ADD_FAVORITE_EVENT: "ADD_FAVORITE_EVENT",
    USER_ASISTIRA_EVENTO: "USER_ASISTIRA_EVENTO",
    DELETE_EVENT:"DELETE_EVENT",
    SOCKET_IO_CONFIG: "SOCKET_IO_CONFIG",
    CLEAN_NOTIFICATIONS: 'CLEAN_NOTIFICATIONS',
    GET_USERS: 'GET_USERS',

    GET_EVENTOSASISTIR:'GET_EVENTOSASISTIR',

    SAVE_NOTIFICATIONS: 'SAVE_NOTIFICATIONS',
    RESET_NOTIFICATIONS: 'RESET_NOTIFICATIONS',
    GET_NOTIF_OFFLINE: 'GET_NOTIF_OFFLINE',
    ADMIN: 'ADMIN',

    FAV_INVITADO: 'FAV_INVITADO',
    GET_FAV_INVITADO:'GET_FAV_INVITADO',
    DEL_FAV_INVITADO: 'DEL_FAV_INVITADO'
}

export default actions; 
