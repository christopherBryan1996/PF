import { useParams } from "react-router-dom";
import BarritaEventos from './BarritaEventos'
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect} from "react";
import { getUsersEvents } from "../actions/actions";
import {Nav} from './Nav';
import './styles/Perfil.css';



export default function  Perfil():JSX.Element {
    const {uid}:{uid:string}=useSelector((state:any)=>state.authGoo.logNormal) //estado global del usuarios.
    console.log(uid, "hhhh")
     const {username}:{username:string}=useParams()

     const dispatch = useDispatch()
    
     const {eventosUsuario}:{eventosUsuario:any}=useSelector((state:any)=>state.eventos)
    useEffect(() => {
        console.log("useeffect")
        dispatch(getUsersEvents(uid));
    }, []);

    
    console.log(eventosUsuario, "hola")
    return eventosUsuario.createdEvents && eventosUsuario.createdEvents.length ? (
        <div>
        <div className="divDelNav"><Nav></Nav></div>
        <div className="perfil">Mis eventos</div>
        
       
        
        <div>
            {eventosUsuario.createdEvents.map((i:{
    _id: string;
    nombreDelEvento:string;
    
})=>(
    <div>
            <BarritaEventos id={i._id} nombreDelEvento={i.nombreDelEvento} uid={uid}/>
            <br /></div>
            ))}
        </div>
        </div>
    ):<div>No tienes eventos creados</div>
}
//* pasarle el username, el ide del evento y el nombre del evento 