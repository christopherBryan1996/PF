import { ImArrowLeft } from "react-icons/im";
import { useHistory } from "react-router-dom";
import {useState} from "react";
import './styles/NewEvent.css';

export default function NewEvent() {

    //Estados------------------------------------------------------------------------------------------

    const [name, setName] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [publicoOPriv, setPublicoOPriv] = useState("publico");
    const [numeroPersonas, setNumeroPersonas] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [fecha, setFecha] = useState("");
    const [descripcion, setDescripcion] = useState("");

    //Funcion para enviar el post del form----------------------------------------------------------------
    const handleSubmit = (e:any) => {
        e.preventDefault();
        if( !name || !ubicacion || !publicoOPriv || !numeroPersonas || !precio || !fecha || !descripcion  ){return alert("Faltan completar casillas!")}
        

        const post = { name, ubicacion, publicoOPriv, numeroPersonas, precio, fecha, descripcion}
        console.log("constPost",post)
        fetch('http://localhost:3001/activity', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        })
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
                             <option value="publico">Publico</option>
                             <option value="privado">Privado</option>
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
                            <label>Nombre del evento</label>
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
                    
                    <button>Crear</button>
                </form>
            </div>
        </div>
    )
};