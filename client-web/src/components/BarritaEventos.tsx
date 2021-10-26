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
            <Link to={`/detail/${id}`}>
            <span>{nombreDelEvento} </span>
            </Link>
            {/* <Link to="/home">
            <span><FiEdit2 className="icons"/></span>
            </Link> */}

            {/* <Link to={`/${props.username}/${props.eventid}`}> */}

            <Link to={`/asistentes/${uid}/${id}`}>
            <span><FaUserFriends className="icons"/></span>
            </Link>


            <button className="boton" onClick={()=>deleteEvent(uid,id,dispatch)}><BsFillTrashFill className="icons"  /></button>

            </div>
            
            
            
            
        </div>
    )

//
}