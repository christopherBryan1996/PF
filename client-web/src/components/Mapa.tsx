import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "./styles/Mapa.css";
import {useState, useEffect} from "react";


export default function Mapa() {

  //-estados------------------------------------------------------
  const [coordenadas, setCoordenadas] = useState<[number, number]>([0,0]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
  
  //funcion para localizar donde se encuentra el usuario------------------------------------------------------------------------
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setInitialPosition([latitude, longitude]);

    });
}, []);
  
  //funcion para marcar en el mapa (se usa como componente en el return del componente)-----------------------------------------

  const Markers = () => {
    const map = useMapEvents({
        click(e:any) {                                
            setCoordenadas([
                e.latlng.lat,
                e.latlng.lng
            ]);                
        },            
    })
    console.log("coordenadas", coordenadas)
    return (
      coordenadas ? 
          <Marker           
          key={coordenadas[0]}
          position={coordenadas}
          interactive={false} 
          />
      : null
  )   
};


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

  return position === null ? null : (
    <Marker position={position}>
      <Popup  >You are here</Popup>
    </Marker>
  )
}



    //Return del componente-------------------------------------------------------
    return (
        
        <div className="mapa">
        <MapContainer center={coordenadas || initialPosition} zoom={13}  >
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
