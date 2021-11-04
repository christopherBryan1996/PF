import { useSelector, useDispatch } from "react-redux";
import { Evento } from './Evento'
import './styles/Card.css'
import { Nav } from './Nav';
import { useHistory } from "react-router-dom";
import Foot from './Foot';
import { getEvents, filtroPrecio, getFavorites } from "../actions/actions"
import React, { useEffect, useState } from "react";
import MapaHome from '../components/MapaHome';

export const Home = () => {

    const [search, setSearch] = useState('')
    const { eventos, eventosFavoritos } = useSelector((state: any) => state.eventos)
    const { authGoo } = useSelector((state: any) => state);

    const history = useHistory();
    const crearEvento = () => {
        history.push("/NewEvent")
    };
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getEvents());
    }, []);

    useEffect(() => {
        authGoo.logNormal &&
            dispatch(getFavorites(authGoo.logNormal.uid))
    }, []);

    function change(e: any) {
        dispatch(filtroPrecio(e.target.value))
    }

    const handlrOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        console.log(search)
    }





    return (


        <div>
            <Nav />

            <div className="card mb-3" >
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src="..." className="card-img" alt="..."/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="container">
                <div className="container ">
                    <div className="container-map-btn">
                        <div className="container-search">

                            <div className="filter container">
                                <select className=" select-home" onChange={change} >
                                    <option selected>Filtrar por precio</option>
                                    <option value="1">Gratis</option>
                                    <option value="2">Pago</option>
                                    <option value="3">de Menor a mayor precio </option>
                                    <option value="4">de Mayor a menor precio</option>
                                </select>
                                <input
                                    type="text"
                                    className="form-control search col-md-3"
                                    placeholder="Buscar evento..."
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={handlrOnchange}
                                />
                                <button onClick={crearEvento} className="btn btn-light col-md-3 ">Crea tu evento</button>


                            </div>
                        </div>

                        <div className="container container-map">
                            <div className="conta">
                                <h5>Para revisar los eventos cercanos a tu ubicacion, da click en el mapa y listo</h5>
                            </div>
                            <div className="conta">
                                <MapaHome />
                            </div>

                        </div>

                    </div>
                </div>


            </div> */}


            <div className=" container-home">

                {eventos && eventos.length && eventos.filter((val: any) => {
                    if (search === '') {
                        return val
                    } else if (val.nombreDelEvento.toLowerCase().includes(search.toLocaleLowerCase())) {
                        return val
                    }
                }).map((i: any) => (

                    <Evento _id={i._id} imagen={i.imagen} fecha={i.fecha} nombreDelEvento={i.nombreDelEvento} precio={i.precio} favoritos={eventosFavoritos} />

                ))
                }
            </div>

            <Foot />

        </div>
    )
}
