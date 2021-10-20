import axios from "axios";


export function llenarCoordenadas (data:string[]) {
    console.log("llego action llenarCoordenadas")
    return async function (dispatch:any){
        return dispatch({type:"llenarCoordenadas", payload: data})
    }
}

export function getEvents (){
    return async function(dispatch:any){
        const res= await axios.get("https://api-fest.herokuapp.com/events");
    dispatch({
        type:"getEvents",
        payload: res.data,
    })
    }
}

// export const fetchCountriesDetail = (id:string) => {

//     return async function (dispatch:any) {

//         try {
//             const res = await axios.get(`http://localhost:3001/countries/${id}`);
//             dispatch({
//                 type: "SET_DETAIL",
//                 payload: res.data,
//             })
//         } catch (error) {

//         }
//     }
// }

export const filtroPrecio=(state:any)=>{//este action es para filtrar por continente

    return {
        type: "filtroPrecio",
        payload:state
    }
}
