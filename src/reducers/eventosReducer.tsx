import { Ievento, IEventoState  } from "../interfaces/interfaces"
import actions from "../actions_type/actions_types"

const initialState:IEventoState  = {
    evento: [],
    eventos: [],
    eventosCompleta:[],//este estado siempre va estar con todos los eventos
    
    eventosFavoritos: [],
    eventosUsuario:[],  
    asistentesEvento: [],
    eventosAsistir:[], 
    tareas:[],
}

export  function eventosReducer  (state = initialState, action:any):{}  {
    switch (action.type) {
        case actions.GET_EVENTS: {
            return {
                ...state,
                eventos:action.payload,
                eventosCompleta:action.payload,
            }
        }
        case actions.GET_EVENT: {
            return {
                ...state,
                evento:action.payload,
                
            }
        }
         case actions.GET_ASISTENTES:{
            return {
                ...state,
                evento: action.payload.nombreDelEvento,
                asistentesEvento: action.payload.asistentes,
            }
        }
        case actions.FILTRO_PRECIO: {
            if(action.payload === "2"){
            return {...state,
                eventos:state.eventosCompleta.filter((a:Ievento)=>a.precio > 0)

            }}else if(action.payload === "1"){
                return {...state,
                    eventos:state.eventosCompleta.filter((a:Ievento)=>a.precio === 0)
            }
        }     else if(action.payload==="3"){
            return{...state,
                eventos:state.eventosCompleta.sort((a:Ievento,b:Ievento)=>a.precio -b.precio)
            }
        }else{
            return{...state,
                eventos:state.eventosCompleta.sort((a:Ievento,b:Ievento)=>b.precio -a.precio)
            }
        }
    }
        case actions.GET_FAVORITES: {
            return {
                ...state,
                eventosFavoritos: action.payload,
            }
        }
        case actions.FILTRO_FAVORITOS:{
            if(action.payload === "2"){
            return {...state,
                eventosFavoritos:state.eventosCompleta.filter((a:Ievento)=>a.precio > 0)

            }}else if(action.payload === "1"){
                return {...state,
                    eventosFavoritos:state.eventosCompleta.filter((a:Ievento)=>a.precio === 0)
            }
        }     else if(action.payload==="3"){
            return{...state,
                eventosFavoritos:state.eventosCompleta.sort((a:Ievento,b:Ievento)=>a.precio -b.precio)
            }
        }else{
            return{...state,
                eventosFavoritos:state.eventosCompleta.sort((a:Ievento,b:Ievento)=>b.precio -a.precio)
            }
        }
    }
    case actions.GET_USERSEVENTS: {
        return {
            ...state,
            eventosUsuario: action.payload,
        }
    }
    case actions.GET_EVENTOSASISTIR: {
        return {
            ...state,
            eventosAsistir: action.payload,
        }
    }
    case actions.GET_TAREAS: {
        return {
            ...state,
            tareas: action.payload,
        }
    }
        

    
    
        default:
            return state;
    }
}