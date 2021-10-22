//interface para las actions
export interface IActions {
    LLENAR_COORDENADAS: string;
    GET_EVENTS: string;
    FILTRO_PRECIO: string;
    GET_ASISTENTES: string;
    LOGIN: string;
<<<<<<< HEAD
<<<<<<< HEAD
    ELIMINAR_ASISTENTE: string;
    GET_FAVORITES: string;
    FILTRO_FAVORITOS: string;
    ELIMINAR_TAREA_DB: string;

=======
=======

    GET_EVENT: string;


>>>>>>> c81833a1ebbd8555a1bb34cb8fb9ae8b8d3cceb2
    GET_FAVORITES: string;
    FILTRO_FAVORITOS: string;    
    LOGOUT:string;
    DELETE_FAVORITE_EVENT: string;
>>>>>>> cf224efd4a2b116d87d919ff59d8bbcfe812ff74
    LOGIN_NORMAL: string;

    
}

//interface para lista de asistentes por evento
export interface Iasistentes {
    id: string;
    usuario: string;
    tareasDelUsuario: string[];
}

//interface para el estado de eventos en redux
export interface IEventoState {
    evento: [];
    eventos: [];
    eventosCompleta: [];
    asistentesEvento: [];
    eventosFavoritos:[];
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


