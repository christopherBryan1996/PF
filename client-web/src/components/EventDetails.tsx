import React from "react";
import { Link } from "react-router-dom";
import "./styles/EventDetails.css";
import {FcLike, FcPrevious} from 'react-icons/fc';
import {FiShoppingCart} from "react-icons/fi";

export default function EventDetails(){
    return(
        <div className="EventDetailsMain">
            <div>
                <Link to="/" >
                <FcPrevious size="3em"  />
                </Link>
                <h1 className="detalles">
                    Detalles
                </h1>
                <Link to="/favoritos" >
                <FcLike size="3em"  />
                </Link>
                <Link to="/favoritos" >
                <FiShoppingCart size="3em" color="white" />
                </Link>
            </div>
            <div className="inputs">
                <h2>Nombre del evento</h2>
                <input className="inputDetalles" placeholder="Nombre del evento"></input>
                <h2>Ubicacion</h2>
                <input className="inputDetalles" placeholder="Ubicacion"></input>
                <h2>Hora</h2>
                <input className="inputDetalles" placeholder="DDMMAAAA HH:MM"></input> to <input className="inputDetalles" placeholder="DDMMAAAA HH:MM"></input>
                <h2>Descripcion</h2>
                <input className="inputDetalles" placeholder="Descripcion"></input>
                <h2>Cantidad de asistentes</h2>
                <input className="inputDetalles" placeholder="Cantidad de asistentes"></input>
                <h2>Precio</h2>
                <input className="inputDetalles" placeholder="Precio"></input>
            </div>


        </div>

    )
}