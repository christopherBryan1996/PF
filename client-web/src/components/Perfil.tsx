import { useParams } from "react-router-dom";
import BarritaEventos from './BarritaEventos'
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect} from "react";
import { getUsersEvents } from "../actions/actions";


export default function  Perfil():JSX.Element {
    const {uid}:{uid:string}=useSelector((state:any)=>state.authGoo.state) //estado global del usuarios.
    
     const {username}:{username:string}=useParams()

     const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getUsersEvents(uid));
    }, []);

    const {user}:{user:any}=useSelector((state:any)=>state.eventos.eventosUsuario)
    const {eventosUsuario}:{eventosUsuario:any}=useSelector((state:any)=>state.eventos)
    console.log(user, "hola")
    return(
        <div>
        <div>navbar</div>
        <div>{username}</div>
        <div>{uid}</div>
        <div>{user.eventosCreados[0]}</div>
        <div>
            <BarritaEventos/>{/* pasarle el username, el ide del evento y el nombre del evento */}
            <BarritaEventos/>
        </div>
        </div>
    )
}