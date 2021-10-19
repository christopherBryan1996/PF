export function llenarCoordenadas (data) {
    console.log("llego action llenarCoordenadas")
    return async function (dispatch){
        return dispatch({type:"llenarCoordenadas", payload: data})
    }
}