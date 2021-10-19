
const initialState = {
    coordenadasRedux: []
}

export  function reducerCoords  (state = initialState, action:any)  {
    switch (action.type) {
        case "llenarCoordenadas":{
            return {
                ...state,
                coordenadasRedux: [action.payload[0], action.payload[1]]
            }
        }
            
    
        default:
            return state;
    }
}
