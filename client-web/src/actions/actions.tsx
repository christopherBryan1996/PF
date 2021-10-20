import axios from "axios";
import { fileUpload } from "../helpers/fileUpload";

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

export const fetchCountriesDetail = (id:string) => {

    return async function (dispatch:any) {

        try {
            const res = await axios.get(`http://localhost:3001/countries/${id}`);
            dispatch({
                type: "SET_DETAIL",
                payload: res.data,
            })
        } catch (error) {

        }
    }
}

