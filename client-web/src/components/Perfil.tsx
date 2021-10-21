import { useParams } from "react-router-dom";
import BarritaEventos from './BarritaEventos'
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect} from "react";



export default function  Perfil():JSX.Element {
    //const {uid}=useSelector((state:any)=>state.authGoo.state) estado global del usuarios.
    const {username}:{username:string}=useParams()

    return(
        <div>
        <div>navbar</div>
        <div>{username}</div>
        <div>
            <BarritaEventos/>{/* pasarle el username, el ide del evento y el nombre del evento */}
            <BarritaEventos/>
        </div>
        </div>
    )
}