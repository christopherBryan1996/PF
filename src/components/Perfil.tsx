import { Link, useParams } from "react-router-dom";
import BarritaEventos from './BarritaEventos'
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getUsersEvents } from "../actions/actions";
import { Nav } from './Nav';
import './styles/Perfil.css';
import Foot from "./Foot";



export default function Perfil(): JSX.Element {
    const { authGoo } = useSelector((state: any) => state) //estado global del usuarios.

    const { username }: { username: string } = useParams()

    const dispatch = useDispatch()

    const { eventosUsuario }: { eventosUsuario: any } = useSelector((state: any) => state.eventos)
    useEffect(() => {
        authGoo.logNormal &&
            dispatch(getUsersEvents(authGoo.logNormal.uid));
    }, []);


    console.log(eventosUsuario, "hola")
    return (
        <div>
            <div className="divDelNav"><Nav></Nav></div>
            <div className="perfil">Mis eventos</div>

            <div className="container container-perfil">
                <Link to={`/misEventos/${authGoo.logNormal.uid}`}>
                    <button className="btn btn-success">Eventos a los que voy a asistir</button>
                </Link>



                <Link to={`/modificarUser/${authGoo.logNormal.uid}`}>
                    <button className="btn btn-success">Editar mi perfil</button>
                </Link>
            </div>


            {eventosUsuario.createdEvents && eventosUsuario.createdEvents.length ?
                <div>
                    {eventosUsuario.createdEvents.map((i: {
                        _id: string;
                        nombreDelEvento: string;
                        precio: number;
                        imagen: string;
                        fecha: string;
                    }) => (
                        <div>
                            <BarritaEventos id={i._id} nombreDelEvento={i.nombreDelEvento} uid={authGoo.logNormal.uid} precio={i.precio} imagen={i.imagen} fecha={i.fecha} />
                            <br /></div>
                    ))}
                </div>
                :
                <div style={{ textAlign: "center", marginTop: "30px" }}>
                    <h6>
                        No tienes eventos a asistir
                    </h6>
                </div>
            }
            <Foot />
        </div>
    )
}
//* pasarle el username, el ide del evento y el nombre del evento