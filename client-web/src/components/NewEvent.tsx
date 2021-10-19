import { ImArrowLeft } from "react-icons/im";
import { useHistory } from "react-router-dom";
import {useState, useEffect} from "react";
import './styles/NewEvent.css';
import Mapa from './Mapa';
import { connect } from "react-redux";


function NewEvent(props:any) {

    //Estados------------------------------------------------------------------------------------------

    const [name, setName] = useState("");
    const [direccion, setDireccion] = useState("");
    const [publicoOPriv, setPublicoOPriv] = useState("publico");
    const [numeroPersonas, setNumeroPersonas] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [fecha, setFecha] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [ubicacion, setUbicacion] = useState<[number, number]>([0,0]);
    
    const setearUbicacion = (e:any)=> {
        setUbicacion(e)
    }

       


    //Funcion para enviar el post del form----------------------------------------------------------------

    

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if( !name  || !publicoOPriv || !numeroPersonas || !precio || !fecha || !descripcion  ){return alert("Faltan completar casillas!")}
        let publicVar= true;
        if (publicoOPriv === "true" )publicVar = true;
        if (publicoOPriv === "false" ) publicVar = false;

        var cordSet= props.coordenadasRedux;
        setUbicacion(cordSet)
        console.log("ubicacion en padre", ubicacion)
        
        const post = { 
            nombreDelEvento: name, 
            direccion, 
            horaDeInicio:  "20:30",
            autor: "pepita",
            publico: publicVar, 
            invitados: numeroPersonas, 
            precio, 
            fecha, 
            descripcion,
            coordenadas: ubicacion
        }

        console.log("constPost",post)

        async function fetchPost(data:object) {
            try {
                await fetch('https://api-fest.herokuapp.com/events/create', {
                method: 'POST', 
                headers: {"Content-Type": "application/json;charset=UTF-8"},
                body: JSON.stringify(data)
            })
            } catch (error) {
                console.error(error);
            }             
        }    
        fetchPost(post)        
    };
    


    //Funcion para redirigir atras---------------------------------------------------------------------
    const history = useHistory();
    const toBack = () => {
        history.goBack() 
    };

    //Return del componente----------------------------------------------------------------------------

    return(
        <div>
            <div className="navCrearEvento">
                <a onClick={toBack} > <ImArrowLeft color="white" fontSize="1.8em"/></a>
                <h1>Crear Evento</h1>
                <button>Aca estaria la fotito de perfil</button>
            </div>
            <div>
                <form onSubmit={handleSubmit} className="form">
                    <div className="divDeLaUl">
                    <ul className="Lista">
                        <li>
                            <label>Nombre del evento</label>
                            <input
                            placeholder="Nombre del evento"
                            type="text"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}></input>
                        </li>

                        <li>
                            <label>Direccion</label>
                            <input
                            placeholder="Ubicacion del evento"
                            type="text"
                            value={direccion}
                            onChange={(e)=>setDireccion(e.target.value)}
                            ></input>
                        </li>

                        <li>
                            <label>Numero de Personas</label>
                            <input
                            type="number"
                            value={numeroPersonas}
                            onChange={(e)=>setNumeroPersonas(parseInt(e.target.value))}
                            ></input>
                        </li>

                        <li>
                            <label>Publico o Privado</label>
                            <select
                            value={publicoOPriv}
                            onChange={(e)=>setPublicoOPriv(e.target.value)}
                            >
                             <option value="true" >Publico</option>
                             <option value="false" >Privado</option>
                            </select>
                        </li>

                        <li>
                            <label>Precio de entrada</label>
                            <input
                            type="number"
                            value={precio}
                            onChange={(e)=>setPrecio(parseInt(e.target.value))}
                            ></input>
                        </li>

                        <li>
                            <label>Fecha</label>
                            <input
                            type="date"
                            value={fecha}
                            onChange={(e)=>setFecha(e.target.value)}
                            ></input>
                        </li>

                    </ul>
                    </div>
                   
                    <div className="inputTextarea">
                        <label>Description</label>
                        <textarea
                        placeholder="Descripcion del evento, detalles, cuidades, etc"
                        value={descripcion}
                        onChange={(e)=>setDescripcion(e.target.value)}
                        ></textarea>
                    </div>
                   
                    <div>
                        <label>Localizacion</label>
                        <br/>
                        <p>Haga click 1 vez para ver su localizacion actual, haga un segundo click para poner un marcador donde sera el evento</p>
                        <div className="divMapa">
                            <Mapa onCambio={setearUbicacion} />
                        </div>
                            
                    </div>
                    
                    <button>Crear</button>
                </form>
            </div>
        </div>
    )
};


  
  function mapStateToProps (state:any)  {
    return {
      coordenadasRedux: state.coordenadasRedux
    };
  };
  
  export default connect(mapStateToProps)(NewEvent)