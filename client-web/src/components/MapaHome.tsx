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

    const eventosHard = [
        {coordenadas: [12, 45],
         nombreDelEvento: "juansito",
         _id: 12},
         
         {coordenadas: [14, 46],
            nombreDelEvento: "juansito2",
            _id: 13}

    ]
  

  
console.log("evetos", eventos)
  
  //funcion para marcar en el mapa (se usa como componente en el return del componente)-----------------------------------------

  const Markers =  () => {
    
    return (
        <div>
            
                   <Marker position={[12, 34]}>
                    <Popup> nombre</Popup>

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
             
 
               {eventosHard.map((e:any)=>{(
                   <Marker position={[e.coordenadas[0], e.coordenadas[1]]}>
                    <Popup> nombre</Popup>

                </Marker> 
               )
                   
               })}
                  
                  
            
       

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