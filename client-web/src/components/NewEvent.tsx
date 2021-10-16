import { ImArrowLeft } from "react-icons/im";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import './styles/NewEvent.css';
import { FaCalendarAlt } from "react-icons/fa";

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
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!name || !ubicacion || !publicoOPriv || !numeroPersonas || !precio || !fecha || !descripcion) { return alert("Faltan completar casillas!") }


        const post = { name, ubicacion, publicoOPriv, numeroPersonas, precio, fecha, descripcion }
        console.log("constPost", post)
        fetch('http://localhost:3001/activity', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post)
        })
    };


    //Funcion para redirigir atras---------------------------------------------------------------------
    const history = useHistory();
    const toBack = () => {
        history.goBack()
    };

    //Return del componente----------------------------------------------------------------------------

    return (

        <div className="container container-h">
            <div className="card shadow-lg p-4 mb-5 bg-dark rounded">
                <form className="bg-dark" />

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label >Nombre de evento</label>
                        <input type="text" className="form-control" id="inputEmail4" placeholder="Nombre evento.." />
                    </div>
                    <div className="form-group col-md-6">
                        <label >Fecha</label>
                        <input type="password" className="form-control" id="inputPassword4" placeholder="Fecha" />
                    </div>
                </div>
                <div className="form-group">
                    <label >Direccion</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="Direccion" />
                </div>
                <div className="form-group">
                    <label >Address 2</label>
                    <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label >City</label>
                        <input type="text" className="form-control" id="inputCity" />
                    </div>
                    <div className="form-group col-md-4">
                        <label >Privacidad</label>
                        <select id="inputState" className="form-control">
                            <option selected>Publico</option>
                            <option>Privado</option>
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label >Numero de invitados</label>
                        <input type="text" className="form-control" id="inputZip" />
                    </div>
                    <div className="form-group col-md-4">
                        <label >Privacidad</label>
                        <select id="inputState" className="form-control">
                            <option selected>Publico</option>
                            <option>Privado</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" >
                            Check me out
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>

            </div>
        </div>




    )
};





// <div>
// <div className="navCrearEvento">
//     <a onClick={toBack} > <ImArrowLeft color="white" fontSize="1.8em"/></a>
//     <h1>Crear Evento</h1>
//     <button>Aca estaria la fotito de perfil</button>
// </div>
// <div>
//     <form onSubmit={handleSubmit} className="form">
//         <div className="divDeLaUl">
//         <ul className="Lista">
//             <li>
//                 <label>Nombre del evento</label>
//                 <input
//                 placeholder="Nombre del evento"
//                 type="text"
//                 value={name}
//                 onChange={(e)=>setName(e.target.value)}></input>
//             </li>

//             <li>
//                 <label>Ubicacion</label>
//                 <input
//                 placeholder="Ubicacion del evento"
//                 type="text"
//                 value={ubicacion}
//                 onChange={(e)=>setUbicacion(e.target.value)}
//                 ></input>
//             </li>

//             <li>
//                 <label>Numero de Personas</label>
//                 <input
//                 type="number"
//                 value={numeroPersonas}
//                 onChange={(e)=>setNumeroPersonas(parseInt(e.target.value))}
//                 ></input>
//             </li>

//             <li>
//                 <label>Publico o Privado</label>
//                 <select
//                 value={publicoOPriv}
//                 onChange={(e)=>setPublicoOPriv(e.target.value)}                            >
//                  <option value="publico">Publico</option>
//                  <option value="privado">Privado</option>
//                 </select>
//             </li>

//             <li>
//                 <label>Precio de entrada</label>
//                 <input
//                 type="number"
//                 value={precio}
//                 onChange={(e)=>setPrecio(parseInt(e.target.value))}
//                 ></input>
//             </li>

//             <li>
//                 <label>Nombre del evento</label>
//                 <input
//                 type="date"
//                 value={fecha}
//                 onChange={(e)=>setFecha(e.target.value)}
//                 ></input>
//             </li>

//         </ul>
//         </div>
//         <div className="inputTextarea">
//             <label>Description</label>
//             <textarea
//             placeholder="Descripcion del evento, detalles, cuidades, etc"
//             value={descripcion}
//             onChange={(e)=>setDescripcion(e.target.value)}
//             ></textarea>
//         </div>
        
//         <button>Crear</button>
//     </form>
// </div>
// </div>