import React, {FunctionComponent} from "react";
import  "./styles/LandingPage.css";




export default function LandingPage ()  {
    return(
        <div>
         

            <div className="nav-contenedor">
                <div className="div-logo">
                    <h1>ClanFest</h1>
                    <button className="botonSobreNosotros">Sobre Nosotros</button>
                </div>
                <div className="botoneslogin">
                    <button className="botonlogin">Ingresa</button>
                    <button>Registrate</button>
                </div>
            </div>

            <div className="div-tarjeta1">
                <div>
                    <h1>La mejor manera de organizar y compartir tus eventos Online</h1>
                    <p>Ten el control tanto en tu computadora como en tu celular</p>
                </div>
                <div>
                    <img src={require('../images/fiestalogin3.jpg')} alt="imagen de vos cuando bajes la app"/>
                </div>
            </div>
        </div>
    )
}