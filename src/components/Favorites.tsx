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


export default function Favorites() {

    const { username }: { username: string } = useParams()
    const { favoritosIds } = useSelector((state: any) => state.favInvitados)

    console.log("username", username)

    const dispatch = useDispatch()

    const { eventosFavoritos } = useSelector((state: any) => state.eventos)
    console.log("eventosFavoritos", eventosFavoritos.favouritesEvents)
    const { authGoo } = useSelector((state: any) => state)

    //verifico si hay favoritos en modo invitado no agregados a la cuenta logueada
    const checkFavoritos = ()=> {
        if(authGoo.logNormal && eventosFavoritos.favouritesEvents 
            && eventosFavoritos.favouritesEvents.length 
            && favoritosIds && favoritosIds.length ){
           const favs: any[] = favoritosIds
            for(let favInvit of favs){
                for(const fav of eventosFavoritos.favouritesEvents ){
                    if(fav._id === favInvit) favInvit = false;
                }
            const newFavs: any = favs.filter((fav: any) => fav !== false);
                return newFavs.length ? newFavs : []
        }
    }
    return [];
}

    useEffect(() => {
        const newFavs: any = checkFavoritos()        
       if (authGoo.logNormal){
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

    // const quitarFavs = (userID:any, eventID:any) => {
    //     dispatch(deleteFavoriteEvent(userID,eventID));
    //     dispatch(getFavorites(userID));

    // }

    const deleteFavoriteEvent = async (id: any, eventid: any) => {
        await axios.patch(`${URLrequests}api/users/removefavourite/${id}/${eventid}`);
        dispatch(getFavorites(authGoo.logNormal.uid));
        eventosFavoritos &&  dispatch(deleteFavoriteInvit(eventid));
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
                {eventosFavoritos.favouritesEvents ? eventosFavoritos.favouritesEvents.map((e: any) => (

                    <div className='card container-card'>
                        <Link to={`/detail/${e._id}`} className="container container-favorites">
                            <div className="card-body">
                            <span><h4>{e.nombreDelEvento} </h4><h5 className="card-text fecha">el {e.fecha.split("").slice(0, 10).join("")}</h5></span> 

                            </div>
                        </Link>
                        <div>
                            <img src={e.imagen} className="card-img-top"/>
                        </div>
                        <br/>
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
            </div>

        </div>
    )
}