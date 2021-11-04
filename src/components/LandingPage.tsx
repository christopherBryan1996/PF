import React from "react";
import "./styles/LandingPage.css";import 'animate.css';
import imagen1 from '../images/fiestalogin.jpg';
import imagen2 from '../images/fiestalogin2.jpg';

import imagen3 from '../images/fiestalogin4.jpg';
import { useHistory } from "react-router-dom";
import Foot from './Foot';
import { Nav } from "./Nav";
import { ToastContainer } from 'react-toastify';

export default function LandingPage() {

    const history = useHistory();

    const toHomeInvitado = () => {
        history.push("/home") 
    };



    //Return del componente------------------------------------------------------------------------------
    return (
        <div>
            <div className=" container nav-contenedor">

                <Nav />

            </div>
            <div className=" cards-container-landing">
            <div className="card mb-5 ml-5 mr-5 mt-5  animacion" >
                <div className="row no-gutters">
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title ml-3 mt-3">La mejor manera de organizar y compartir tus eventos Online</h2>
                            <p className="card-text mt-5 mb-5 ml-3">Ten el control tanto en tu computadora como en tu celular</p>

                            <button className="btn btn-success" onClick={toHomeInvitado} >Hecha un vistazo</button>
                        </div>

                    </div>
                    <div className="col-md-4">
                        <img src={imagen1} className="card-img" alt="..." />
                    </div>
                </div>
            </div>

            <div className="card mb-3 mb-5 ml-5 mr-5  " >
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={imagen2} className="card-img" alt="..." />

                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title mt-5 ml-5 animate__slideInLeft">Agrega eventos a tu lista de Favoritos</h2>
                            <p className="card-text  mt-5">Arma tu bandeja de favoritos, asi no tienes tiempo que perder pensando cual es tu mejor opción</p>


                        </div>

                    </div>
                </div>
            </div>

            <div className="card mb-3 mb-5 ml-5 mr-5 animacion" >
                <div className="row no-gutters">
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title mt-5 ml-3">Organiza eventos y compartelos en tus redes</h2>
                            <p className="card-text mt-5 ml-3">No te preocupes por las invitaciones, con nosotros todo es mas fácil y rápido</p>


                        </div>

                    </div>
                    <div className="col-md-4">
                        <img src={imagen3} className="card-img" alt="..." />
                    </div>
                </div>
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