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

  

    

    const coords= [
        { lat: 41.19197, lng: 25.33719 },
        { lat: 41.26352, lng: 25.1471 },
        { lat: 41.26365, lng: 25.24215 },
        { lat: 41.26369, lng: 25.33719 },
        { lat: 41.26365, lng: 25.43224 },
        { lat: 41.26352, lng: 25.52728 },
        { lat: 41.2633, lng: 25.62233 },
        { lat: 41.263, lng: 25.71737 },
        { lat: 41.3082, lng: 22.95892 },
        { lat: 41.31041, lng: 23.054 }
      ]


  
console.log("evetos", eventos)
  
  //funcion para marcar en el mapa (se usa como componente en el return del componente)-----------------------------------------

  const Markers =  () => {
    
    return (
        <div>
            
                   <Marker position={[12, 34]}>
                    <Popup> nombre Markers</Popup>

                </Marker> 
                 
        </div>
        
  )   
};



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
  
    <Markers/>
             
 
    {eventos.map(( e:any , index:any) => ( e.coordenadas.lat ?
      <Marker position={[e.coordenadas.lat, e.coordenadas.lng]}  key={index}>
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