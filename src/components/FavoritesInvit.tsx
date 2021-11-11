import { useEffect } from "react";
import { deleteFavoriteInvit, getFavoriteInvitado } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import './styles/Favorites.css'
import { Link } from "react-router-dom";
import { ImBin } from "react-icons/im";
import { Nav } from "./Nav";
import { toast, ToastContainer } from 'react-toastify';
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { IoCopyOutline } from "react-icons/io5";
import Foot from "./Foot";


export function FavoritesInv() {

    const dispatch = useDispatch()

    const { favoritosInfo, favoritosIds } = useSelector((state: any) => state.favInvitados)

    useEffect(() => {
        dispatch(getFavoriteInvitado(favoritosIds));
    }, [favoritosIds]);


    const eventoQuitado = () => toast.warning('Evento fue eliminado de tus favoritos!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const seCopio = () => toast.success('El URL del evento se copio en tu teclado', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const deleteFavoriteEvent = async (eventid: string) => {
        dispatch(deleteFavoriteInvit(eventid));
        eventoQuitado();
    }

    

    const toEventClipboard = (_id: any) => {

        var UrlCompartir = `https://flamboyant-golick-d7cb40.netlify.app/detail/${_id}`;
        navigator.clipboard.writeText(UrlCompartir);
        seCopio();
    }



    return (
        <div>
            <Nav />
            <div className="container container-favorites">
              <div style={{ textAlign: "center", marginTop: "30px" }}>
              <h2>Favoritos</h2>
            </div>
          
            
                {favoritosInfo.length 
                ? favoritosInfo.map((e: any, idx: number) => (

                <>
                <div className="card mb-3 container-card-favorites" key={idx}>
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <Link to={`/detail/${e._id}`}>
                            <img 
                            src={e.imagen} 
                            className="card-img" 
                            height="180px" alt="..." 
                            />
                        </Link>
                    </div>

                   
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{e.nombreDelEvento}</h5>
                            <p className="card-text fecha">
                                {e.fecha.split("").slice(0, 10).join("")}
                                </p>
                            <p className="card-text">
                                <small className="text-muted">
                                    {e.precio === 0 ? 'Gratis' : `Valor: $${e.precio}`}
                                </small>
                            </p>
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
                                <ImBin className="icon-delete" fontSize="1.6em" onClick={() => deleteFavoriteEvent(e._id)} />
                            </div>

                        </div>
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
                </>

                )) : null }
            </div>     
            <Foot />
        </div>
    );
}

