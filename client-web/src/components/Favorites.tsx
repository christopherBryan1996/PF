import React, { useEffect} from "react";
import {  getFavorites} from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import './styles/Favorites.css'
import { useParams } from "react-router-dom";
import { ImHeart, ImCross } from "react-icons/im";


// https://api-fest.herokuapp.com/api/users

//                                   /favouritesevents/:id'

//                                                         61708d7df0064afec86c1277


export default function Favorites() {
    
    const {username}:{username:string}=useParams()

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getFavorites(username));
    }, []);

    
    const {eventosFavoritos}=useSelector((state:any)=>state.eventos)

    console.log("estado favoritos", eventosFavoritos.favouritesEvents)

    // function change(e:any){
    //     dispatch(filtroFavoritos(e.target.value))
    // }    

    



    return(
        <div>
            <div className="DivDeArriba">
                <div className="DivTituloFiltros">
                    <h1>Favoritos</h1>
                    {/* <input placeholder="Buscar evento en favoritos" className="input"></input>
                    <select className="form-select form-select-lg border" aria-label="Default select example" onChange={change} >
                        <option selected>Filtrar por precio</option>
                        <option value="1">Gratis</option>
                        <option value="2">Pago</option>  
                        <option value="3">Menor a mayor</option>  
                        <option value="4">Mayor a menor</option>                
                    </select> */}
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
                        <ImCross/>
                    </div>
                </div>
                )) : null
                }
            </div>
        </div>
    )
}