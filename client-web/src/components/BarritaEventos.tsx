import React from "react"
import {FiEdit2} from "react-icons/fi";
import {FaUserFriends} from "react-icons/fa";
import {BsFillTrashFill} from "react-icons/bs";
import "./styles/BarritaEventos.css"
import { Link } from "react-router-dom";
import { IeventosUsuario } from "../interfaces/interfaces";
import { useDispatch} from "react-redux";
import {deleteEvent} from "../controllers/eventos/eventoscontrollers"

export default function BarritaEventos({id,nombreDelEvento,uid}:IeventosUsuario) {
    
    const dispatch=useDispatch();
   
    
    return(
        <div>
            <div className="barra">
            <span>{nombreDelEvento} </span>
            <Link to="/home">
            <span><FiEdit2 color="blue" size="2em"/></span>
            </Link>

            {/* <Link to={`/${props.username}/${props.eventid}`}> */}

            <Link to={`/asistentes/${uid}/${id}`}>
            <span><FaUserFriends color="blue" size="2em"/></span>
            </Link>


            <button onClick={()=>deleteEvent(uid,id,dispatch)}><BsFillTrashFill color="blue" size="2em"  /></button>

            </div>
            
            
            
            
        </div>
    )

//
}