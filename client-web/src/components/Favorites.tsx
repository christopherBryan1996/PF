import React, { useEffect } from "react";
import { getFavorites, deleteFavoriteEvent } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import './styles/Favorites.css'
import { useParams } from "react-router-dom";
import { ImHeart, ImCross } from "react-icons/im";
import { useHistory } from "react-router-dom";
import { Nav } from "./Nav";
import { toast, ToastContainer } from 'react-toastify';


// https://api-fest.herokuapp.com/api/users

//                                   /favouritesevents/:id'

//                                                         61708d7df0064afec86c1277


export default function Favorites() {

    const { username }: { username: string } = useParams()

    console.log("username", username)

    const dispatch = useDispatch()

    const { eventosFavoritos } = useSelector((state: any) => state.eventos)
    const { authGoo } = useSelector((state: any) => state)

    useEffect(() => {
        authGoo.logNormal &&
            dispatch(getFavorites(authGoo.logNormal.uid));
    }, []);

    const history = useHistory();
    const back = () => {
        history.goBack()
    };


    const eventoQuitado = () => toast.warning('Evento fue eliminado de tus favoritos!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const quitarFavs = (userID:any, eventID:any) => {
        dispatch(deleteFavoriteEvent(userID,eventID));
        dispatch(getFavorites(userID));
        eventoQuitado();
    }


    return (
        <div>

            <Nav />
            <div className="DivDeArriba">
                <div className="DivTituloFiltros">
                    <button onClick={back}>Back</button>
                    <h1>Favoritos</h1>
                </div>

            </div>
            <div className="divMapeoTarjetas">
                {eventosFavoritos.favouritesEvents ? eventosFavoritos.favouritesEvents.map((e: any) => (
                    <div className="tarjetaFavoritos">
                        <div>
                            <ImHeart className="corazao"/>
                        </div>
                        <div >
                            <p className="nombreTarjeta">{e.nombreDelEvento}</p>
                        </div>
                        <div>
                            <ImCross className="cruz" onClick={() => {  quitarFavs(authGoo.logNormal.uid,  e._id)}} />
                        </div>
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
                    </div>
                )) : null
                }
            </div>
        </div>
    )
}