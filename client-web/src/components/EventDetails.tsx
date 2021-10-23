import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./styles/EventDetails.css";
import { FaCalendarAlt } from "react-icons/fa"
import { FiShoppingCart, FiUserPlus } from "react-icons/fi";
import imag from '../images/bolos.jpg';
import { useEffect } from "react";
import { getEvent, userAsistiraEvento } from "../actions/actions"
import Mapa1evento from "./Mapa1evento";
import { ToastContainer, toast } from 'react-toastify';




export default function EventDetails() {

    //NOTIFICACIONES------------------------------------------------------------------------------
    const asistire = () => toast.success('Ahora figuras como que asistiras al evento', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    //CONSTANTS USE EFFECT Y VARIABLES------------------------------------------------------------------------------
    const url = window.location.pathname;


    const { eventid }: { eventid: string } =
        useParams();
    console.log('event:', eventid);

    const dispatch = useDispatch()

    const evento = useSelector((state: any) => state.eventos.evento)
    const { uid } = useSelector((state: any) => state.authGoo.logNormal);

    useEffect(() => {
        dispatch(getEvent(eventid));
    }, []);


    console.log("evento", evento)

    const agregarGenteAsistir = () => {
        dispatch(userAsistiraEvento(uid, evento._id))
        asistire();
    }

    var privadoOpublico = evento.publico;
    var final = "Publico - Cualquiera puede asistir";
    if (privadoOpublico === false) { final = "Privado - Solo invitados" };


    //return del componente------------------------------------------------------------------------------

    return evento.imagen ? (
        <div className="container container-detail" >
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
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
                    {!privadoOpublico && <div><FiShoppingCart size="2em" color="white" />
                        <p>Adquirir Boletos</p></div>}
                </div>
                <div className="card-footer">
                    {privadoOpublico && evento.precio === 0 && <div onClick={agregarGenteAsistir}> <FiUserPlus size="2em" color="white" />
                        <p>Asistire al evento</p>  </div>}
                </div>

            </div>
            <div className="card-details ">

                {/* <img className="card-img-top" src={mapa} alt="Card image cap" height="600" /> */}
                <div >
                    <Mapa1evento />
                </div>
            </div>

        </div>
    ) : null
}