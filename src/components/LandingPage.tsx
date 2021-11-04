import React from "react";
import "./styles/LandingPage.css";
import imagen1 from '../images/fiestalogin.jpg';
import imagen2 from '../images/fiestalogin2.jpg';

import imagen3 from '../images/fiestalogin4.jpg';
import { useHistory } from "react-router-dom";
import Foot from './Foot';
import { Nav } from "./Nav";
import { ToastContainer } from 'react-toastify';

export default function LandingPage() {

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
    return (
        <div>
            <div className=" container nav-contenedor">

                <Nav />

            </div>

            <div className="div-tarjeta1">
                <div className="contTextoBoton">
                    <h2 className="titulotarjeta2 text-center">La mejor manera de organizar y compartir tus eventos Online</h2>
                    <p className="parrafo1">Ten el control tanto en tu computadora como en tu celular</p>
                    <button className="btn btn-success" onClick={toHomeInvitado} >Hecha un vistazo</button>
                </div>
                <div>
                    <img src={imagen1} alt="imagen de vos cuando bajes la app" className="imagenes" />
                </div>
            </div>

            <div className="div-tarjeta1">
                <div>
                    <img src={imagen2} alt="imagen de vos cuando bajes la app" className="imagenes" />
                </div>
                <div className="contTextoBoton">
                    <h2 className="titulotarjeta2 text-center" >Agrega eventos a tu lista de Favoritos</h2>
                    <p className="parrafo1 text-center">Arma tu bandeja de favoritos, asi no tienes tiempo que perder pensando cual es tu mejor opción</p>

                </div>
            </div>

            <div className="div-tarjeta1">
                <div className="contTextoBoton text-center">
                    <h2 className="titulotarjeta2 text-center">Organiza eventos y compartelos en tus redes</h2>
                    <p className="parrafo1 text-center">No te preocupes por las invitaciones, con nosotros todo es mas fácil y rápido</p>

                </div>
                <div className="imagen" >
                    <img src={imagen3} alt="imagen de vos cuando bajes la app" className="imagenes" />
                </div>
            </div>
             <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Foot />

        </div>
    )
}