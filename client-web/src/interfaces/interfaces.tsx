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
    DELETE_EVENT:string;
    SOCKET_IO_CONFIG: string;
    CLEAN_NOTIFICATIONS: string;
    
}

//interface para lista de asistentes por evento
export interface Iasistentes {
    eventId: string
    usuario: any;
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