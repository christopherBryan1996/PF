import { ImArrowLeft } from "react-icons/im";
import { useHistory } from "react-router-dom";
import {useState} from "react";
import './styles/NewEvent.css';
import Mapa from './Mapa';

export default function NewEvent() {

    //Estados------------------------------------------------------------------------------------------

    const [name, setName] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [publicoOPriv, setPublicoOPriv] = useState("publico");
    const [numeroPersonas, setNumeroPersonas] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [fecha, setFecha] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [coordenadasPadre, setCoordenadasPadre] = useState<[number, number]>([0,0]);


    function llenarEstadoCoordenadas(data:any) {
        return setCoordenadasPadre(data)
    };
    //Funcion para enviar el post del form----------------------------------------------------------------

    

    const handleSubmit = (e:any) => {
        e.preventDefault();

        if( !name || !ubicacion || !publicoOPriv || !numeroPersonas || !precio || !fecha || !descripcion  ){return alert("Faltan completar casillas!")}
        let publicVar= true;
        if (publicoOPriv === "true" )publicVar = true;
        if (publicoOPriv === "false" ) publicVar = false;
        
        const post = { 
            nombreDelEvento: name, 
            direccion: ubicacion, 
            horaDeInicio:  "20:30",
            autor: "pepita",
            publico: publicVar, 
            invitados: numeroPersonas, 
            precio, 
            fecha, 
            descripcion,
           
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
                            <label>Ubicacion</label>
                            <input
                            placeholder="Ubicacion del evento"
                            type="text"
                            value={ubicacion}
                            onChange={(e)=>setUbicacion(e.target.value)}
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
                            <Mapa />
                        </div>
                            
                    </div>
                    
                    <button>Crear</button>
                </form>
            </div>
        </div>
    )
};