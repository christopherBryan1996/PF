import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "./styles/MapaHome.css";
import {useState, useEffect} from "react";
import {llenarCoordenadas} from '../actions/actions';
import { connect, useDispatch, useSelector } from "react-redux";
import { getEvent } from "../actions/actions"


function Mapa1evento(props:any ) {

  //-estados------------------------------------------------------
  const [coordenadas, setCoordenadas] = useState<[number, number]>([0,0]);

  const url = window.location.pathname;
    const path= url.split("/")[2];
 
    
    const evento = useSelector((state:any)=>state.eventos.evento)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getEvent(path));
    }, []);


  
  
  //funcion para marcar en el mapa (se usa como componente en el return del componente)-----------------------------------------

  







    //Return del componente-------------------------------------------------------
    return  evento.imagen ? (
        
        <div className="mapa">
        <MapContainer center={[evento.coordenadas.lat, evento.coordenadas.lng]} zoom={13}  >
        <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
           
 
    
      <Marker position={[evento.coordenadas.lat, evento.coordenadas.lng]} 
              key={evento._id}
              eventHandlers={{
                click: (e) => {
                  alert("Aqui se encuentra el evento")
                }}}>
          <Popup>
                {evento.nombreDelEvento}
          </Popup>
      </Marker>
                
    
    </MapContainer>
    </div>
    
    ) : null;
}

function mapDispatchToProps(dispatch:any) {
  return {
    llenarCoordenadas: (data:any) => dispatch(llenarCoordenadas(data))
  };
};

function mapStateToProps (state:any)  {
  return {
    coordenadasRedux: state.coordenadasRedux
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mapa1evento)