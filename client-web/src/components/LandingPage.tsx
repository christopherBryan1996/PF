import React, {FunctionComponent} from "react";
import  "./styles/LandingPage.css";
<<<<<<< HEAD



export default function LandingPage ()  {
=======
import imagen1 from '../images/fiestalogin.jpg';
import imagen2 from '../images/fiestalogin2.jpg';
import imagen3 from '../images/fiestalogin4.jpg';
import { useHistory } from "react-router-dom";

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




>>>>>>> 56c48f6bd9a78ecbaa348e7f276ec682f5f45eab
    return(
        <div>
            <div className="nav-contenedor">
                <div className="div-logo">
                    <h1>ClanFest</h1>
<<<<<<< HEAD
                    <button className="botonSobreNosotros">Sobre Nosotros</button>
                </div>
                <div className="botoneslogin">
                    <button className="botonlogin">Ingresa</button>
                    <button>Registrate</button>
=======
                    <button className="botonSobreNosotros" onClick={botonSobreNosotros}>Sobre Nosotros</button>
                </div>
                <div className="botoneslogin">
                    <button className="botonlogin" onClick={botonIngresa}>Ingresa</button>
                    <button onClick={botonRegistrate}>Registrate</button>
                </div>
            </div>

            <div className="div-tarjeta1">
                <div>
                    <h2 className="titulotarjeta2">La mejor manera de organizar y compartir tus eventos Online</h2>
                    <p className="parrafo1">Ten el control tanto en tu computadora como en tu celular</p>
                </div>
                <div>
                    <img src={imagen1} alt="imagen de vos cuando bajes la app" className="imagenes"/>
>>>>>>> 56c48f6bd9a78ecbaa348e7f276ec682f5f45eab
                </div>
            </div>

            <div className="div-tarjeta1">
                <div>
<<<<<<< HEAD
                    <h1>La mejor manera de organizar y compartir tus eventos Online</h1>
                    <p>Ten el control tanto en tu computadora como en tu celular</p>
                </div>
                <div>
                    <img src={require('../images/fiestalogin3.jpg')} alt="imagen de vos cuando bajes la app"/>
=======
                    <img src={imagen2} alt="imagen de vos cuando bajes la app" className="imagenes"/>
                </div>
                <div>
                    <h2 className="titulotarjeta2" >Agrega eventos a tu lista de Favoritos</h2>
                    <p className="parrafo1">Arma tu bandeja de favoritos, asi no tienes tiempo que perder pensando cual es tu mejor opcion</p>
                </div>
            </div>

            <div className="div-tarjeta1">
                <div>
                    <h2 className="titulotarjeta2">Organiza eventos y compartelos en tus redes</h2>
                    <p className="parrafo1">No te preocupes por las invitaciones, con nosotros todo es mas facil y rapido</p>
                </div>
                <div>
                    <img src={imagen3} alt="imagen de vos cuando bajes la app" className="imagenes"/>
                </div>
            </div>
            <div className="linea"></div>
            <div className="contenedorFinal">
                <div className="p">
                    <p>2021 ©ClanFest All rights reserved</p>
                </div>
                <div className="divUl"> 
                    <ul className="listafinal">
                        <li><p>Home</p></li>
                        <li><p>About Us</p></li>
                        <li><p>Twitter</p></li>
                        <li><p>Facebook</p></li>
                        <li><p>Henry</p></li>
                        <li><p>Linkedin</p></li>
                        <li><p>Privacy Policy</p></li>
                        <li><p>Register</p></li>
                    </ul>
>>>>>>> 56c48f6bd9a78ecbaa348e7f276ec682f5f45eab
                </div>
            </div>
        </div>
    )
}