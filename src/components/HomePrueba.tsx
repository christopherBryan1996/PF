
import { useSelector, useDispatch } from "react-redux";
import './styles/Card.css'
import { Nav } from './Nav';
import { useHistory } from "react-router-dom";
import Foot from "./Foot";
import { getEvents, filtroPrecio, getFavorites } from "../actions/actions";
import React, { useEffect, useState } from "react";
import MapaHome from "../components/MapaHome";
import { EventoCategoria } from "./EventoCategorias";
import categorias from "../categorias/Categorias";

export const HomePrueba = () => {
  const [search, setSearch] = useState("");
  const { eventos, eventosFavoritos } = useSelector(
    (state: any) => state.eventos
  );
  const { authGoo } = useSelector((state: any) => state);

  const history = useHistory();
  const crearEvento = () => {
    history.push("/NewEvent");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents());
  }, []);

  useEffect(() => {
    authGoo.logNormal && dispatch(getFavorites(authGoo.logNormal.uid));
  }, []);

  function change(e: any) {
    dispatch(filtroPrecio(e.target.value));
  }

  const handlrOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(search);
  };

  return (
    <div>
      <Nav />

      <div className="container">


        <div className="card mb-5 container-map-btn" >
          <div className="card-header row card-header-home ">
          <select className=" select-home col-md-3 col-sm-1 mb-3" onChange={change}>
                  <option selected>Filtrar por precio</option>
                  <option value="1">Gratis</option>
                  <option value="2">Pago</option>
                  <option value="3">de Menor a mayor precio </option>
                  <option value="4">de Mayor a menor precio</option>
                </select>
                <input
                  type="text"
                  className="form-control search mb-3 col-md-3 col-sm-1"
                  placeholder="Buscar evento..."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={handlrOnchange}
                />
                 <button
                  onClick={crearEvento}
                  className="btn btn-light col-md-3 col-sm-1 mb-3 "
                >
                  Crea tu evento
                </button>
          </div>
          <div className="row no-gutters">
            <div className="col-md-6">
            <MapaHome />
            
            </div>
            <div className="col-md-6">
              <div className="card-body card-body-map">
                <h5 className="card-title">Buscas eventos cerca a tu ubucación?</h5>
                <p className="card-text">Con un Click en el mapa los puedes encontrar</p>
                <p className="card-text"><small className="text-muted">Debes aceptar acceder a tu ubucación</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container">
        <div className="container ">
          <div className="container-map-btn">
            <div className="container-search">
              <div className="filter container">
                <select className=" select-home" onChange={change}>
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
                <button
                  onClick={crearEvento}
                  className="btn btn-light col-md-3 "
                >
                  Crea tu evento
                </button>
              </div>
            </div>

            <div className="container container-map">
              <div className="conta">
                <h5>
                  Para revisar los eventos cercanos a tu ubicacion, da click en
                  el mapa y listo
                </h5>
              </div>
              <div className="conta">
                <MapaHome />
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/*Carousel*/}

      {eventos.length ? (
        <div className="carousel">
          {categorias.map((i: string) => (
            <EventoCategoria
              search={search}
              eventos={eventos}
              categoria={i}
              favoritos={eventosFavoritos}
            />
          ))}
        </div>
      ) : null}

      <Foot />
    </div>
  );
};
