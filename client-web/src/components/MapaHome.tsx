import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "./styles/MapaHome.css";
import {useState, useEffect} from "react";
import {llenarCoordenadas} from '../actions/actions';
import { connect, useDispatch, useSelector } from "react-redux";
import { getEvents } from "../actions/actions"


function MapaHome(props:any ) {

  //-estados------------------------------------------------------
  const [coordenadas, setCoordenadas] = useState<[number, number]>([0,0]);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getEvents());
    }, []);
    const {eventos}=useSelector((state:any)=>state.eventos)

  
  
  //funcion para marcar en el mapa (se usa como componente en el return del componente)-----------------------------------------

  



//funcion que centra el mapa cuando haces click-------------------------------------------------------------

const LocationMarker = () => {
  const [position, setPosition] = useState<[number, number]>([0,0]);
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition([
        e.latlng.lat,
        e.latlng.lng
    ])
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return  null 
}



    //Return del componente-------------------------------------------------------
    return (
        
        <div className="mapa">
        <MapContainer center={coordenadas} zoom={13}  >
        <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
           
 
    {eventos.map(( e:any , index:any) => ( e.coordenadas.lat ?
      <Marker position={[e.coordenadas.lat, e.coordenadas.lng]} 
              key={index}
              eventHandlers={{
                click: (e) => {
                  alert("esto redireccionara al detalle del evento")
                }}}>
          <Popup>
                {e.nombreDelEvento}
          </Popup>
      </Marker>
                : null ))}
                  
                  
            
       

    <LocationMarker/>
    
    </MapContainer>
    </div>
    
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(MapaHome)