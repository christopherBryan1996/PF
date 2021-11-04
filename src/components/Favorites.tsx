import React, { useEffect } from "react";
import { getFavorites, deleteFavoriteInvit } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import './styles/Favorites.css'
import { Link, useParams } from "react-router-dom";
import { ImBin } from "react-icons/im";
import { useHistory } from "react-router-dom";
import { Nav } from "./Nav";
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import URLrequests from "./constanteURL";
import { combinarFavs } from "../controllers/favoritosInvit/favoritosInvit";
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { IoCopyOutline } from "react-icons/io5";
import Foot from "./Foot";


export default function Favorites() {

    const { username }: { username: string } = useParams()
    const { favoritosIds } = useSelector((state: any) => state.favInvitados)

    console.log("username", username)

    const dispatch = useDispatch()

    const { eventosFavoritos } = useSelector((state: any) => state.eventos)
    console.log("eventosFavoritos", eventosFavoritos.favouritesEvents)
    const { authGoo } = useSelector((state: any) => state)

    //verifico si hay favoritos en modo invitado no agregados a la cuenta logueada
    const checkFavoritos = () => {
        if (authGoo.logNormal && eventosFavoritos.favouritesEvents
            && eventosFavoritos.favouritesEvents.length
            && favoritosIds && favoritosIds.length) {
            const favs: any[] = favoritosIds
            for (let favInvit of favs) {
                for (const fav of eventosFavoritos.favouritesEvents) {
                    if (fav._id === favInvit) favInvit = false;
                }
                const newFavs: any = favs.filter((fav: any) => fav !== false);
                return newFavs.length ? newFavs : []
            }
        }
        return [];
    }

    useEffect(() => {
        const newFavs: any = checkFavoritos()
        if (authGoo.logNormal) {
            newFavs.length ? combinarFavs(authGoo.logNormal.uid, newFavs, dispatch)
                : combinarFavs(authGoo.logNormal.uid, favoritosIds, dispatch)
        }
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


    const deleteFavoriteEvent = async (id: any, eventid: any) => {
        await axios.patch(`${URLrequests}api/users/removefavourite/${id}/${eventid}`);
        dispatch(getFavorites(authGoo.logNormal.uid));
        eventosFavoritos && dispatch(deleteFavoriteInvit(eventid));
        eventoQuitado();
    }
    const seCopio = () => toast.success('El URL del evento se copio en tu teclado', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const toEventClipboard = (_id: any) => {

        var UrlCompartir = `http://localhost:3000/detail/${_id}`;
        navigator.clipboard.writeText(UrlCompartir);
        seCopio();
    }


    return (
        <div>

            <Nav />

            <div className="container container-favorites">
                <div>
                    <h2>Favoritos</h2>
                </div>

                {eventosFavoritos.favouritesEvents ? eventosFavoritos.favouritesEvents.map((e: any) => (

                    <><div className="card mb-3 container-card-favorites">
                        <div className="row no-gutters">

                            <div className="col-md-4">
                                <Link to={`/detail/${e._id}`}>
                                    <img src={e.imagen} className="card-img" height="180px" alt="..." />
                                </Link>

                            </div>

                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{e.nombreDelEvento}</h5>
                                    <p className="card-text fecha">{e.fecha.split("").slice(0, 10).join("")}</p>
                                    <p className="card-text"><small className="text-muted">{e.precio === 0 ? 'Gratis' : `Valor: $${e.precio}`}</small></p>
                                </div>

                            </div>
                        </div>
                        <div className="card-footer">
                            <span className="spa">Compartir con tus amigos</span>
                            <FacebookShareButton url={`https://flamboyant-golick-d7cb40.netlify.app/detail/${e._id}`} quote='Hola, quiero compartir este evento'>
                                <FacebookIcon className="share" round={true} size='2em' />
                            </FacebookShareButton>
                            <WhatsappShareButton
                                title='Hola, te comparto este evento, te pueda interesar!'
                                url={`https://flamboyant-golick-d7cb40.netlify.app/detail/${e._id}`}>
                                <WhatsappIcon className="share" round={true} size='2em' />
                            </WhatsappShareButton>
                            <button
                                className="botonCopy"
                                onClick={() => toEventClipboard(e._id)}>
                                <IoCopyOutline></IoCopyOutline>
                            </button>
                            <div className="icon">
                                <ImBin className="icon-delete" fontSize="1.6em" onClick={() => deleteFavoriteEvent(authGoo.logNormal.uid, e._id)} />
                            </div>
                        </div>
                    </div><ToastContainer
                            position="top-right"
                            autoClose={1000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover /></>

                )) : null
                }



            </div>



            {/* <div className="card">
            </div>
            <div className="DivDeArriba">
                <div className="DivTituloFiltros">
                    <h1>Mis Favoritos</h1>
                </div>
            </div>



            <div className="container container-cards">
                {eventosFavoritos.favouritesEvents ? eventosFavoritos.favouritesEvents.map((e: any) => (

                    <div className='card container-card'>
                        <Link to={`/detail/${e._id}`} className="container container-favorites">
                            <div className="card-body">
                            <span><h4>{e.nombreDelEvento} </h4><h5 className="card-text fecha">el {e.fecha.split("").slice(0, 10).join("")}</h5></span> 

                            </div>
                        </Link>
                        <div>
                            <img src={e.imagen} className="card-img-top" />
                        </div>
                        <br />
                        <div className="icon">
                            <ImBin className="icon-delete" fontSize="1.6em" onClick={() => deleteFavoriteEvent(authGoo.logNormal.uid, e._id)} />
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
            </div> */}
            <Foot />
        </div>
    )
}


