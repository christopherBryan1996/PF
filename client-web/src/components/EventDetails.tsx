import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./styles/EventDetails.css";
import {FaCalendarAlt} from "react-icons/fa"
import { FiShoppingCart } from "react-icons/fi";
import imag from '../images/bolos.jpg';
import { useEffect} from "react";
import { getEvent} from "../actions/actions"
import Mapa1evento from "./Mapa1evento";




export default function EventDetails() {

    const url = window.location.pathname;
    const path= url.split("/")[2];
 
    const dispatch = useDispatch()
    
    const evento = useSelector((state:any)=>state.eventos.evento)

    useEffect(() => {
        dispatch(getEvent(path));
        }, [evento]);

    
    console.log("evento", evento)

    var privadoOpublico = evento.publico;
    var final = "Publico - Cualquiera puede asistir";
    if(privadoOpublico=== false){ final = "Privado - Solo invitados"};




    return  evento.imagen ? ( 
        <div className="container container-detail" >
            <div className="card card-details ">

                <img className="card-img-top" src={evento.imagen} alt="Card image cap" height="400" />
                <div className="card-body">

                    <h5 className="card-text"> <span><FaCalendarAlt color="white" /></span> {evento.fecha.split("T")[0]}</h5>
                    <h3 className="card-title">{evento.nombreDelEvento}</h3>
                </div>
                <div className="card-footer">
                    <p>Hora: <span>{evento.horaDeInicio}</span>  </p>
                    <p>Ubicacion: <span>{evento.direccion}</span>  </p>
                    <p>Asistentes: <span>{evento.asistentes.length}</span></p>
                    <p>Precio: <span>{evento.precio}$ (moneda local)</span></p>
                    <p>Publico: <span>{final}</span></p>
                </div>
                <div className="card-footer">
                    <p>Descripción: <span>{evento.descripcion}</span>  </p>
                </div>
                <div className="card-footer">
                    <Link to="/favoritos" className="favoritos" >
                        <FiShoppingCart size="2em" color="white" />
                        <p>Adquirir Boletos</p>
                    </Link>
                </div>

            </div>
            <div className="card-details ">
                
                {/* <img className="card-img-top" src={mapa} alt="Card image cap" height="600" /> */}
                <div >
                    <Mapa1evento/>
                </div>
            </div>
        </div>
    ) : null
}