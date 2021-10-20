import { Ievento, IEventoState  } from "../interfaces/interfaces"
import actions from "../actions_type/actions_types"

const initialState:IEventoState  = {
    eventos: [],
    eventosCompleta:[],//este estado siempre va estar con todos los eventos
    asistentesEvento: { _id:'', asistentes:[]}
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
        case actions.GET_ASISTENTES:{
            return {
                ...state,
                asistentesEvento: action.payload,
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
    
        default:
            return state;
    }
}