//interface para las actions
export interface IActions {
    LLENAR_COORDENADAS: string;
    GET_EVENTS: string;
    FILTRO_PRECIO: string;
    GET_ASISTENTES: string;
    LOGIN: string;
    GET_EVENT: string;
    GET_FAVORITES: string;
    FILTRO_FAVORITOS: string;
    GET_USERSEVENTS: string;      
    LOGOUT:string;
    DELETE_FAVORITE_EVENT: string;
    LOGIN_NORMAL: string;
    ADD_FAVORITE_EVENT: string;
    USER_ASISTIRA_EVENTO: string;
    
    CLEAN_NOTIFICATIONS: string;
   
    GET_EVENTOSASISTIR:string;
 
    DELETE_EVENT:string;   
      
    ADMIN: string;    
    SOCKET_IO_CONFIG: string;   
    SAVE_NOTIFICATIONS: string;    
    RESET_NOTIFICATIONS: string;
    GET_NOTIF_OFFLINE: string;
    GET_USERS: string;   
    FAV_INVITADO: string; 
    GET_FAV_INVITADO: string; 
    DEL_FAV_INVITADO: string;
}

//interface para lista de asistentes por evento
export interface Iasistentes {
    eventId: string;
    usuario: any;
    eventName: string;
    avatar:string;
    userId: string;
    tareasDelUsuario: string[];
}



//interface para los eventos creados por usuario
export interface IeventosUsuario {
    id: string;
    nombreDelEvento:string;
    uid:string;
    precio:number;
    imagen:string;
    fecha:string;
}

export interface IeventosAsistir {
    eventId:any;
    tareas:any;
}


export interface Iusers{

    users:[];

}


//interface para evento con su ID y lista de asistentes
export interface IasistentesAEvento {
    usuario: string; 
    tareasDelUsuario: [];
}

//interface para el estado de eventos en redux
export interface IEventoState {
    evento: [];
    eventos: [];
    eventosCompleta: [];
    asistentesEvento: IasistentesAEvento[];
    eventosFavoritos:[];
    eventosUsuario:[];
    eventosAsistir:[], 
}

//interface para la lista de eventos
export interface Ievento {
    nombreDelEvento: string;
    _id: string;
    direccion: string;
    coordenadas: [];
    precio: number;
    fecha: string;
    horaDeInicio: string;
    descripcion: string;
    fechaDeCreacion: string;
    autor: string;
    publico: boolean;
    invitados: number;
    imagen: string;
}

export interface INotificaciones {
    uid: string,
    type: string,
    idEvento: string,
    message: string,
}

export interface INotifRecibidas {
    uid: string,
    type: string,
    idEvento: string,
    message: string,
    _id: string
}