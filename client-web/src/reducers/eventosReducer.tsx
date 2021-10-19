const initialState = {
    eventos: [],
    eventosCompleta:[]//este estado siempre va estar con todos los eventos
}

interface Ievento {
    nombreDelEvento:string;
    _id: string;
    direccion: string;
    coordenadas: [];
    precio:number;
    fecha: string;
    horaDeInicio: string;
    descripcion: string;
    fechaDeCreacion: string;
    autor: string;
    publico: boolean;
    invitados: number;
    imagen:string;

}

export  function eventosReducer  (state = initialState, action:any):{}  {
    switch (action.type) {
        case "getEvents":{
            return {
                ...state,
                eventos:action.payload,
                eventosCompleta:action.payload,
            }
        }
        case "filtroPrecio":{
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