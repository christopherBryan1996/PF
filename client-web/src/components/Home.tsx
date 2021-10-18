

import { Evento } from './Evento'
import './styles/Card.css'
import { Nav } from './Nav';
import Foot from './Foot';

export const Home = () => {
    return (
        <div>
            <Nav/>
            <div className="filter container">

                <select className="form-select form-select-lg border" aria-label="Default select example">
                    <option selected>Filtrar por precio</option>
                    <option value="1">Gratis</option>
                    <option value="2">Pago</option>                
                </select>

                <button className="btn btn-light">Crea tu evento</button>
            </div>
            <div className="container container-home">

                <Evento />
                <Evento />
                <Evento />
                <Evento />
                <Evento />
                <Evento />
                <Evento />
                <Evento />
                <Evento />
                <Evento />
            </div>

            <Foot/>

        </div>
    )
}


