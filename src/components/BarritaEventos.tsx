import React from "react"
import {FiEdit2} from "react-icons/fi";
import {FaUserFriends} from "react-icons/fa";
import {BsFillTrashFill} from "react-icons/bs";
import "./styles/BarritaEventos.css"
import { Link } from "react-router-dom";
import { IeventosUsuario } from "../interfaces/interfaces";
import { useSelector, useDispatch} from "react-redux";
import {deleteEvent} from "../controllers/eventos/eventoscontrollers"


export default function BarritaEventos({id,nombreDelEvento,uid,precio,imagen,fecha}:IeventosUsuario) {
    
   const dispatch=useDispatch();
   const { authGoo, socketIO }: { authGoo: any; socketIO: any } = useSelector(
    (state: any) => state
  );
    


    return(
        <div>
            <div className="barra">
            <img className="card-img-top" src={imagen} alt="Card image cap" height="240" />

            <div className="card-body">
            <p className="card-text">{fecha.slice(0, 10)}</p>
            <Link to={`/detail/${id}`}>
            <span>{nombreDelEvento} </span>
            </Link>
            {
                                (precio === 0
                                    ?
                                    <p className="card-text">Gratis</p>
                                    :
                                    <p className="card-text">Valor:  ${precio}</p>
                                )
                            }
            </div>

            <div className="card-footer">
            <Link to={`/modificarEventos/${id}`}>
            <span><FiEdit2 className="icons"/></span>
            </Link>

            {/* <Link to={`/${props.username}/${props.eventid}`}> */}

            <Link to={`/asistentes/${uid}/${id}`}>
            <span><FaUserFriends className="icons"/></span>
            </Link>

            <button className="boton" onClick={()=>deleteEvent(uid, id, authGoo.logNormal.name, nombreDelEvento, socketIO.socket, dispatch)}><BsFillTrashFill className="icons"  /></button>

             </div>                  
            </div>
        </div>
    )
}