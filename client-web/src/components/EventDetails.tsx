
import { Link } from "react-router-dom";
import "./styles/EventDetails.css";
import {FaCalendarAlt} from "react-icons/fa"
import { FiShoppingCart } from "react-icons/fi";
import imag from '../images/bolos.jpg';
import mapa from '../images/mapa.jpg';


export default function EventDetails() {
    return (
        <div className="container container-detail" >
            <div className="card card-details ">

                <img className="card-img-top" src={imag} alt="Card image cap" height="400" />
                <div className="card-body">

                    <h5 className="card-text"> <span><FaCalendarAlt color="white" /></span>   20/10/2021</h5>
                    <h3 className="card-title">Jugar Bolos</h3>
                </div>
                <div className="card-footer">
                    <p>Hora: <span>18:00</span>  </p>
                    <p>Ubicacion: <span>calle 25#32-06</span>  </p>
                    <p>Asistentes: <span>100</span></p>
                    <p>Precio: <span>100</span></p>
                    <p>Publico: <span>Si - Cualquiera puede asistir</span></p>
                </div>
                <div className="card-footer">
                    <p>Descripción: <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic</span>  </p>
                </div>
                <div className="card-footer">
                    <Link to="/favoritos" className="favoritos" >
                        <FiShoppingCart size="2em" color="white" />
                        <p>Adquirir Boletos</p>
                    </Link>
                </div>

            </div>
            <div className="card-details ">
                
                {/* <img className="card-img-top" src={mapa} alt="Card image cap" height="600" /> */}
                <div className="card-footer">
                    <p>Ubicacion: <span>calle 25#32-06</span>  </p>
                </div>
            </div>
        </div>
    )
}