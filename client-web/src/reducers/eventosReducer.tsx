const initialState = {
    eventos: []
}

export  function eventosReducer  (state = initialState, action:any):{}  {
    switch (action.type) {
        case "getEvents":{
            return {
                ...state,
                eventos:action.payload
            }
        }
            
    
        default:
            return state;
    }
}