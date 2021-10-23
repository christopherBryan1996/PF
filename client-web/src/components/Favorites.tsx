import React, { useEffect } from "react";
import { getFavorites, deleteFavoriteEvent } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import './styles/Favorites.css'
import { useParams } from "react-router-dom";
import { ImHeart, ImCross } from "react-icons/im";
import { useHistory } from "react-router-dom";
import { Nav } from "./Nav";


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

    return (
        <div>

            <Nav />
            <div className="DivDeArriba">
                <div className="DivTituloFiltros">
                    <button onClick={back}>Back</button>
                    <h1>Favoritos</h1>
                </div>

            </div>
            <div>
                {eventosFavoritos.favouritesEvents ? eventosFavoritos.favouritesEvents.map((e: any) => (
                    <div className="tarjetaFavoritos">
                        <div>

                        </div>
                        <div>
                            <h1>{e.nombreDelEvento}</h1>
                        </div>
                        <div>
                            <ImCross onClick={() => {
                                dispatch(deleteFavoriteEvent(authGoo.logNormal.uid, e._id));
                                dispatch(getFavorites(authGoo.logNormal.uid))
                            }} />
                        </div>
                    </div>
                )) : null
                }
            </div>
        </div>
    )
}