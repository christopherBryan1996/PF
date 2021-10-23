import React, { useEffect } from "react";
import { getFavorites, deleteFavoriteEvent } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import './styles/Favorites.css'
import { Link, useParams } from "react-router-dom";
import { ImBin } from "react-icons/im";
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
          <div className="card">

          </div>

            <div className="DivDeArriba">
                <div className="DivTituloFiltros">

                    <h1>Mis Favoritos</h1>
                </div>

            </div>
            <div className="container container-cards">
                {eventosFavoritos.favouritesEvents ? eventosFavoritos.favouritesEvents.map((e: any) => (

                    <div className="card col-md-8">
                        <Link to={`/detail/${e._id}`} className="container container-favorites">
                            <div className="card-body">
                                <h4>{e.nombreDelEvento}</h4>

                            </div>
                        </Link>
                        <div className="icon">
                            <ImBin fontSize="1.6em" onClick={() => {
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