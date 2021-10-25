import { Link, useParams } from "react-router-dom";
import BarritaEventos from './BarritaEventos'
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getUsersEvents } from "../actions/actions";
import { Nav } from './Nav';
import './styles/Perfil.css';



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
            <Link to={`/modificarUser/${authGoo.logNormal}`}>
            <button className="modPerfil">Editar mi perfil</button>
            </Link>
            {eventosUsuario.createdEvents && eventosUsuario.createdEvents.length ?
                <div>
                    {eventosUsuario.createdEvents.map((i: {
                        _id: string;
                        nombreDelEvento: string;
                    }) => (
                        <div>
                            <BarritaEventos id={i._id} nombreDelEvento={i.nombreDelEvento} uid={authGoo.logNormal.uid} />
                            <br /></div>
                    ))}
                </div>
                : <div>No tienes eventos creados</div>
            }
        </div>
    )
}
//* pasarle el username, el ide del evento y el nombre del evento