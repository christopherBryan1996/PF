export function llenarCoordenadas (data) {
    console.log("llego action llenarCoordenadas" , data)
    return async function (dispatch){
        return dispatch({type:"llenarCoordenadas", payload: data})
    }
}