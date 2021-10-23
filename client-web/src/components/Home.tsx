import { useSelector, useDispatch } from "react-redux";
import { Evento } from './Evento'
import './styles/Card.css'
import { Nav } from './Nav';
import { useHistory } from "react-router-dom";
import Foot from './Foot';
import { getEvents,filtroPrecio } from "../actions/actions"
import React, { useEffect} from "react";

import MapaHome from '../components/MapaHome';

export const Home = () => {

    const history = useHistory();
    const crearEvento = () => {
        history.push("/NewEvent")
    };


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getEvents());
    }, []);


    const { eventos } = useSelector((state: any) => state.eventos)
    console.log("eventos", eventos)



    function change(e: any) {
        dispatch(filtroPrecio(e.target.value))
    }

    return (

        <div>


            <Nav />
            <div className="container">

                <div className="container ">
            <div className="container-map-btn">

                    <div className="filter container">

                    <select className=" select-home" onChange={change} >
                            <option selected>Filtrar por precio</option>
                            <option value="1">Gratis</option>
                            <option value="2">Pago</option>
                            <option value="3">Menor a mayor</option>
                            <option value="4">Mayor a menor</option>
                        </select>

                        <button onClick={crearEvento} className="btn btn-light col-md-3 ">Crea tu evento</button>

                    </div>
                    <div className="container container-map">
                        <div className="conta">
                            <h5>Para revisar los eventos cercanos a tu ubicacion, da click en el mapa y listo</h5>
                        </div>
                        <div  className="conta">
                            <MapaHome />
                        </div>

                    </div>

                    </div>
                </div>


            </div>


            <div className=" container-home">

                {eventos.map((i: any) => (

                    <Evento _id={i._id} imagen={i.imagen} fecha={i.fecha} nombreDelEvento={i.nombreDelEvento} />

                ))
                }
            </div>

            <Foot />

        </div>
    )
}
