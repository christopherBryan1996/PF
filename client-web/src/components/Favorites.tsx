import React, { useEffect} from "react";
import { getEvents } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import './styles/Favorites.css'
import { Link } from "react-router-dom";
import { Evento } from './Evento'

export default function Favorites() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getEvents());
    }, []);

    // function change(e:any){
    //     dispatch(filtroPrecio(e.target.value))
    // }    

    const {eventos}=useSelector((state:any)=>state.eventos)
    console.log("eventos", eventos)



    return(
        <div>
            <div className="DivDeArriba">
                <div className="DivTituloFiltros">
                    <h1>Favoritos</h1>
                    <input placeholder="Buscar evento en favoritos" className="input"></input>
                    <select className="form-select form-select-lg border" aria-label="Default select example"  >
                        <option selected>Filtrar por precio</option>
                        <option value="1">Gratis</option>
                        <option value="2">Pago</option>  
                        <option value="3">Menor a mayor</option>  
                        <option value="4">Mayor a menor</option>                
                    </select>
                </div>
                <div>
                    <button>Aca va a estar la foto de perfil</button>
                </div>
            </div>
            <div>
               {eventos.map((i:any) => (
                
                <Evento imagen={i.imagen} fecha={i.fecha} nombreDelEvento={i.nombreDelEvento} />
                ))
                }
            </div>
        </div>
    )
}