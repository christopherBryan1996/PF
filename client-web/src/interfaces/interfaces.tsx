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

    
}

//interface para lista de asistentes por evento
export interface Iasistentes {
    usuario: string;
    tareasDelUsuario: string[];
}

//interface para evento con su ID y lista de asistentes
export interface IasistentesAEvento {
    _id: string;
    asistentes: Iasistentes[];
}

//interface para el estado de eventos en redux
export interface IEventoState {
    evento: [];
    eventos: [];
    eventosCompleta: [];
    asistentesEvento: IasistentesAEvento;
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


