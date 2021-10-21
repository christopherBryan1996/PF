//interface para las actions
export interface IActions {
    LLENAR_COORDENADAS: string;
    GET_EVENTS: string;
    FILTRO_PRECIO: string;
    GET_ASISTENTES: string;
    LOGIN: string;
    LOGIN_DB: string;
    ELIMINAR_ASISTENTE: string;
    GET_FAVORITES: string;
    FILTRO_FAVORITOS: string;

}

//interface para lista de asistentes por evento
export interface Iasistentes {
    id: string;
    usuario: string;
    tareasDelUsuario: string[];
}

//interface para el estado de eventos en redux
export interface IEventoState {
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
