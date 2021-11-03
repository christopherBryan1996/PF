
import { FiEdit2 } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
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
    
   


    return (
        <div className="container">
            <div className="card mb-3 container-card-favorites">
                <div className="row no-gutters">

                    <div className="col-md-4">
                        <Link to={`/detail/${id}`}>
                            <img src={imagen} className="card-img" height="180px" alt="..." />
                        </Link>

                    </div>

                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{nombreDelEvento}</h5>
                            <p className="card-text fecha">{fecha.split("").slice(0, 10).join("")}</p>
                            <p className="card-text small-"><small className="text-muted">{precio === 0 ? 'Gratis' : `Valor: $${precio}`}</small></p>
                        </div>

                    </div>
                </div>
                <div className="card-footer">
                    <Link to={`/asistentes/${uid}/${id}`}>
                        <span><FaUserFriends font-size='1.3ren' className="icons" /></span>
                    </Link>
                    <Link to={`/modificarEventos/${id}`}>
                        <span><FiEdit2 className="icons" /></span>
                    </Link>
                 <BsFillTrashFill  onClick={()=>deleteEvent(uid, id, authGoo.logNormal.name, nombreDelEvento, socketIO.socket, dispatch)} className="icons"  />
                </div>
            </div>

        </div>

    )
}








// <div className="barra">
// <img className="card-img-top" src={imagen} alt="Card image cap" height="240" />

// <div className="card-body">
// <p className="card-text">{fecha.slice(0, 10)}</p>
// <Link to={`/detail/${id}`}>
// <span>{nombreDelEvento} </span>
// </Link>
// {
//                     (precio === 0
//                         ?
//                         <p className="card-text">Gratis</p>
//                         :
//                         <p className="card-text">Valor:  ${precio}</p>
//                     )
//                 }
// </div>

// <div className="card-footer">
// <Link to={`/modificarEventos/${id}`}>
// <span><FiEdit2 className="icons"/></span>
// </Link>

// {/* <Link to={`/${props.username}/${props.eventid}`}> */}

// <Link to={`/asistentes/${uid}/${id}`}>
// <span><FaUserFriends className="icons"/></span>
// </Link>

// <button className="boton" onClick={()=>deleteEvent(uid, id, authGoo.logNormal.name, nombreDelEvento, socketIO.socket, dispatch)}><BsFillTrashFill className="icons"  /></button>

//  </div>                  
// </div>