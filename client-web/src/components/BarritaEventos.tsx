import React from "react"
import {FiEdit2} from "react-icons/fi";
import {FaUserFriends} from "react-icons/fa";
import {BsFillTrashFill} from "react-icons/bs";
import "./styles/BarritaEventos.css"
import { Link } from "react-router-dom";

export default function BarritaEventos() {

    return(
        <div>
            <div className="barra">
            <span>Mi evento </span>
            <Link to="/home">
            <span><FiEdit2 color="blue" size="2em"/></span>
            </Link>
            {/* <Link to={`/${props.username}/${props.eventid}`}> */}
            <Link to="/juan/616f6f4fdb5f15a30b5e3fdd">
            <span><FaUserFriends color="blue" size="2em"/></span>
            </Link>


            <span><BsFillTrashFill color="blue" size="2em"/></span>

            </div>
            
            
            
            
        </div>
    )

//
}