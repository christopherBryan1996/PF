import React, { useEffect} from "react";
import {  getFavorites, deleteFavoriteEvent} from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import './styles/Favorites.css'
import { useParams } from "react-router-dom";
import { ImHeart, ImCross } from "react-icons/im";
import { useHistory } from "react-router-dom";


// https://api-fest.herokuapp.com/api/users

//                                   /favouritesevents/:id'

//                                                         61708d7df0064afec86c1277


export default function Favorites() {
    
    const {username}:{username:string}=useParams()
    console.log("username", username)

    const dispatch = useDispatch()

     const {eventosFavoritos}=useSelector((state:any)=>state.eventos)

    useEffect(() => {
        dispatch(getFavorites(username));
    }, [eventosFavoritos.favouritesEvents, dispatch]);

    const history = useHistory();
    const back = () => {
        history.goBack()
    };
   
    




    return(
        <div>
            <div className="DivDeArriba">
                <div className="DivTituloFiltros">
                    <button onClick={back}>Back</button>
                    <h1>Favoritos</h1>
                </div>
                <div>
                    <button>Aca va a estar la foto de perfil</button>
                </div>
            </div>
            <div>
               { eventosFavoritos.favouritesEvents ? eventosFavoritos.favouritesEvents.map((e:any) => (
                <div className="tarjetaFavoritos">
                    <div>
                        <ImHeart/>
                    </div>
                    <div>
                        <h1>{e.nombreDelEvento}</h1>
                    </div>
                    <div>
                        <ImCross onClick={()=> {dispatch(deleteFavoriteEvent(username, e._id));
                                                dispatch(getFavorites(username)) }}/>
                    </div>
                </div>
                )) : null
                }
            </div>
        </div>
    )
}