import React from "react";
import  "./styles/LandingPage.css";
import imagen1 from '../images/fiestalogin.jpg';
import imagen2 from '../images/fiestalogin2.jpg';
import imagen3 from '../images/fiestalogin4.jpg';
import { useHistory } from "react-router-dom";
import Foot from './Foot';
 
export default function LandingPage ()  {

    const history = useHistory();
    const botonSobreNosotros = () => {
        history.push("/about")
    };
    const botonIngresa = () => {
        history.push("/login")
    };
    const botonRegistrate = () => {
        history.push("/register")
    };
    const toHomeInvitado = () => {
        history.push("/home")
    };



    //Return del componente------------------------------------------------------------------------------
    return(
        <div>
            <div className="nav-contenedor">
                <div className="div-logo">
                    <h1>ClanFest</h1>
                    <button className="botonSobreNosotros" onClick={botonSobreNosotros}>Sobre Nosotros</button>
                </div>
                <div className="botoneslogin">
                    <button className="botonlogin" onClick={botonIngresa}>Ingresa</button>
                    <button onClick={botonRegistrate}>Registrate</button>
                </div>
            </div>

            <div className="div-tarjeta1">
                <div className="contTextoBoton">
                    <h2 className="titulotarjeta2">La mejor manera de organizar y compartir tus eventos Online</h2>
                    <p className="parrafo1">Ten el control tanto en tu computadora como en tu celular</p>
                    <button onClick={toHomeInvitado} >Pruebalo gratis</button>
                </div>
                <div>
                    <img src={imagen1} alt="imagen de vos cuando bajes la app" className="imagenes"/>
                </div>
            </div>

            <div className="div-tarjeta1">
                <div>
                    <img src={imagen2} alt="imagen de vos cuando bajes la app" className="imagenes"/>
                </div>
                <div className="contTextoBoton">
                    <h2 className="titulotarjeta2" >Agrega eventos a tu lista de Favoritos</h2>
                    <p className="parrafo1">Arma tu bandeja de favoritos, asi no tienes tiempo que perder pensando cual es tu mejor opcion</p>
                    <button onClick={toHomeInvitado} >Hecha un vistazo</button>
                </div>
            </div>

            <div className="div-tarjeta1">
                <div className="contTextoBoton">
                    <h2 className="titulotarjeta2">Organiza eventos y compartelos en tus redes</h2>
                    <p className="parrafo1">No te preocupes por las invitaciones, con nosotros todo es mas facil y rapido</p>
                    <button onClick={toHomeInvitado} >Intentalo ya</button>
                </div>
                <div>
                    <img src={imagen3} alt="imagen de vos cuando bajes la app" className="imagenes"/>
                </div>
            </div>

            <div className="linea"></div>

            <Foot/>

        </div>
    )
}