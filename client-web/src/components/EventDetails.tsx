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
                <Link to="/favoritos" className="favoritos">
                <FcLike size="3em"  />
                </Link>
                <Link to="/favoritos" className="favoritos" >
                <FiShoppingCart size="3em" color="white" />
                </Link>
            </div>
            <div className="inputs">
                <h2>Nombre del evento</h2>
                    <div className="pdetalles">
                    <p>evento</p>
                    </div>
                <h2>Ubicacion</h2>
                    <div className="pdetalles">
                    <p>Ubicacion</p>
                    </div>
                <h2>Hora</h2>
                <div className="pdetalle">
                    <p className="hora">DDMMAAA HH:MM</p>
                    </div> to <div className="pdetalle">
                    <p className="hora">DDMMAAA HH:MM</p>
                    </div>
                <h2>Descripcion</h2>
                <div className="pdetalles">
                    <p>Descripcion</p>
                    </div>
                <h2>Cantidad de asistentes</h2>
                <div className="pdetalles">
                    <p>asistentes qt</p>
                    </div>
                <h2>Precio</h2>
                <div className="pdetalles">
                    <p>precio</p>
                    </div>
            </div>


        </div>

    )
}