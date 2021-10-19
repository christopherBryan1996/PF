import { connect, useSelector, useDispatch } from "react-redux";
import { Evento } from './Evento'
import './styles/Card.css'
import { Nav } from './Nav';
import Foot from './Foot';

import { getEvents,filtroPrecio } from "../actions/actions"

import React, { useEffect} from "react";
import MapaHome from '../components/MapaHome';

export const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getEvents());
        }, []);

        const {eventos}=useSelector((state:any)=>state.eventos)
        console.log(eventos)

        function change(e:any){
            dispatch(filtroPrecio(e.target.value))
        }

    return (
        <div>
            <Nav/>
            <div className="filter container">

                <select className="form-select form-select-lg border" aria-label="Default select example" onChange={change}>
                    <option selected>Filtrar por precio</option>
                    <option value="1">Gratis</option>
                    <option value="2">Pago</option>  
                    <option value="3">Menor a mayor</option>  
                    <option value="4">Mayor a menor</option>                
                </select>

                <button className="btn btn-light">Crea tu evento</button>
            
            </div>

            <div>
                <MapaHome/>
            </div>



            <div className="container container-home">

                {eventos.map((i:any) => (
                
                <Evento imagen={i.imagen} fecha={i.fecha} nombreDelEvento={i.nombreDelEvento} />
                ))
                }
            </div>

            <Foot/>

        </div>
    )
}


// function mapDispatchToProps(dispatch:any):{} {
//     return { getEvents: () => dispatch(getEvents()) };
//     }

// export default connect(null, mapDispatchToProps)(Home);