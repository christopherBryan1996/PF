
import './styles/Card.css'
import { Link } from "react-router-dom";
import imag from '../images/bolos.jpg';





export const Evento = () => {
    return (
        <>
            
            <div className="container container-card">
                <div className="card ">
                <Link to="/details"className="link" >
                    <img className="card-img-top" src={imag} alt="Card image cap"  height="240" />
                    <div className="card-body">
                        <p className="card-text">20/10/2021</p>
                        <h5 className="card-title">Jugar Bolos</h5>
                    </div>
                    </Link>
                    <div className="card-footer">
                        <button className="btn btn-outline-success my-2 my-sm-0"> Añadir a Favoritos</button>
                        
                    </div>
                    
                </div>
            </div>
            
        </>
    )
}
