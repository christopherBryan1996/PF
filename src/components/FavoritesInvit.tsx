import { useEffect } from "react";
import { deleteFavoriteInvit, getFavoriteInvitado } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import './styles/Favorites.css'
import { Link } from "react-router-dom";
import { ImBin } from "react-icons/im";
import { Nav } from "./Nav";
import { toast, ToastContainer } from 'react-toastify';


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


    const deleteFavoriteEvent = async (eventid: string) => {
        dispatch(deleteFavoriteInvit(eventid));
        eventoQuitado();
    }

    return (
        <div>

            <Nav />
            <div className="card">
            </div>
            <div className="DivDeArriba">
                <div className="DivTituloFiltros">
                    <h1>Mis Favoritos</h1>
                </div>
            </div>
            <div className="container container-cards">
                {favoritosInfo.length ? favoritosInfo.map((e: any, idx: number) => (

                    <div className="card col-md-8" key={idx}>
                        <img src={e.imagen} />
                        <Link to={`/detail/${e._id}`} className="container container-favorites">
                            <div className="card-body">
                                <h4>{e.nombreDelEvento}</h4>

                            </div>
                        </Link>
                        <div>
                            <p>{e.fecha.slice(0,9)}</p>
                        </div>
                        <div className="icon">
                            <ImBin className="icon-delete" fontSize="1.6em" onClick={() => deleteFavoriteEvent(e._id)} />
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