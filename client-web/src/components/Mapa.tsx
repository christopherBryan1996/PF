import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "./styles/Mapa.css";
import {useState, useEffect} from "react";
import {llenarCoordenadas} from '../actions/actions';
import { connect } from "react-redux";


function Mapa(props:any) {

  //-estados------------------------------------------------------
  const [coordenadas, setCoordenadas] = useState<[number, number]>([0,0]);
  

  

  
  //funcion para marcar en el mapa (se usa como componente en el return del componente)-----------------------------------------

  const Markers = () => {
    const map = useMapEvents({
        click(e:any) {   
           var coordMoment = [e.latlng.lat, e.latlng.lng]                             
            props.llenarCoordenadas(coordMoment);
            setCoordenadas([e.latlng.lat, e.latlng.lng])   //chequear estado redux             
        },            
    })
    console.log("coordenadas", coordenadas)
    return (
      coordenadas ? 
          <Marker           
          key={coordenadas[0]}
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
  
  <Markers/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Mapa)