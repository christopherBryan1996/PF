
import './styles/Card.css'
import { Link } from "react-router-dom";
import imag from '../images/bolos.jpg';


interface  Iprops {fecha:string,imagen:string,nombreDelEvento:string}


export const Evento = (props:Iprops) => {


    const {fecha,imagen,nombreDelEvento}:Iprops =props
    
    return (
        <>
            
            <div className="container container-card">
                <div className="card ">
                <Link to="/details"className="link" >
                    <img className="card-img-top" src={imagen} alt="Card image cap"  height="240" />
                    <div className="card-body">
                        <p className="card-text">{fecha.slice(0,10)}</p>
                        <h5 className="card-title">{nombreDelEvento}</h5>
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
