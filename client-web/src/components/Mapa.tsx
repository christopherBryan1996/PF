import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "./styles/Mapa.css";
import {useState, useEffect} from "react";
import {llenarCoordenadas} from '../actions/actions';
import { connect } from "react-redux";


function Mapa(props:any ) {

  //-estados------------------------------------------------------
  const [coordenadas, setCoordenadas] = useState({lat:1, lng: 1});
  

  

  
  //funcion para marcar en el mapa (se usa como componente en el return del componente)-----------------------------------------

  const Markers =  () => {
    const map =  useMapEvents({
       click(e:any)  {   
                                      
          setCoordenadas({lat: e.latlng.lat, lng: e.latlng.lng}) 
          
          props.onCambio(coordenadas)               
        },            
    })
    
    return (
      coordenadas ? 
          <Marker           
          key={coordenadas["lat"]}
          position={coordenadas}
          interactive={false} >
            <Popup  >Aqui ocurrira el evento</Popup>
          </Marker>
      : null
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
  
  
    <LocationMarker/>
    <Markers/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Mapa)