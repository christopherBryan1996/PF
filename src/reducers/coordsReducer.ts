
const initialState = {
    coordenadasRedux: []
}

export const reducerCoords = (state = initialState, action:any) => {
    switch (action.type) {
        case "llenarCoordenadas":{
            return {
                coordenadasRedux: action.payload
            }
        }
            
    
        default:
            return state;
    }
}
