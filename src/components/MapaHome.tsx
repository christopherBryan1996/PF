import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "./styles/MapaHome.css";
import { useState, useEffect } from "react";
import { llenarCoordenadas } from '../actions/actions';
import { connect, useDispatch, useSelector } from "react-redux";
import { getEvents } from "../actions/actions"
import {Link} from 'react-router-dom';


function MapaHome(props: any) {



  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getEvents());
  }, []);
  const { eventos } = useSelector((state: any) => state.eventos)



  //funcion para marcar en el mapa (se usa como componente en el return del componente)-----------------------------------------





  //funcion que centra el mapa cuando haces click-------------------------------------------------------------
  const [zoom, setZoom] = useState<number>(1);
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const LocationMarker = () => {


    const map = useMapEvents({

      click() {
        setZoom(13)
        console.log('zoom:', zoom)
        map.locate()
      },
      locationfound(e) {


        setPosition([
          e.latlng.lat,
          e.latlng.lng
        ])
        map.flyTo(e.latlng, zoom)

      },
    })

    return null
  }



  //Return del componente-------------------------------------------------------
  return (

    <div className="mapa">

      <MapContainer center={position} zoom={zoom}   >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {eventos.map((e: any, index: any) => (e.coordenadas ?
          <Marker position={[e.coordenadas.lat, e.coordenadas.lng]}
            key={index}
            eventHandlers={{
              click: (e) => {
                console.log("tocaste el popup")
              }
            }}>
            <Popup>
              {e.nombreDelEvento}
              <Link to={`/detail/${e._id}`}>Vea los detalles del evento</Link>
            </Popup>
          </Marker>
          : null))}
        <LocationMarker />
      </MapContainer>
    </div>

  );
}

function mapDispatchToProps(dispatch: any) {
  return {
    llenarCoordenadas: (data: any) => dispatch(llenarCoordenadas(data))
  };
};

function mapStateToProps(state: any) {
  return {
    coordenadasRedux: state.coordenadasRedux
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapaHome)