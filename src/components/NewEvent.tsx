import { useState } from "react";
import { fileUpload } from "../helpers/fileUpload";
import './styles/NewEvent.css';
import { ToastContainer, toast } from 'react-toastify';
import Mapa from './Mapa';
import { Nav } from "./Nav";
import axios from "axios";
import {useSelector} from 'react-redux';
import URLrequests from "./constanteURL";
import { useHistory } from "react-router-dom";
import categorias from "../categorias/Categorias";
import dateFormat, { masks } from "dateformat";

export default function NewEvent() {


    //Estados------------------------------------------------------------------------------------------
    const [nameEvent, setNameEvent] = useState("");
    const [ubicacion, setUbicacion] = useState("");

    const [numeroPersonas, setNumeroPersonas] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [fecha, setFecha] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [coordenadasPadre, setCoordenadasPadre] = useState({ lat: 1, lng: 1 });
    const [file, setFile] = useState<any>({})
    const [creando, setCreando] = useState(false);
    const [categories, setCategorias]=useState<any>([]);
    const now = new Date();
    const hoy = dateFormat(now, "isoDateTime").slice(0,19)
    console.log('HOYY',hoy)
    

    const eventoCreado = () => toast.success('El evento fue creado con exito', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const faltanCasillas = () => toast.error('Faltan completar casillas!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });


    function llenarEstadoCoordenadas(data: any) {
        console.log("data", data)
        setCoordenadasPadre(data)
    };


    const {authGoo}=useSelector((state:any)=>state)
    
    const history :any = useHistory();
    const toLogin = () => {
        history.push("/login")
    };

    //Funcion para enviar el post del form----------------------------------------------------------------

    const handleFileChange = (e: any) => {

        const pic = e.target.files[0]
        setFile(pic);

    }
    console.log(file)

    const handleSubmit = async (e: any) => {

        e.preventDefault();
        console.log("fecha", fecha)
        if(!authGoo.logNormal) return toLogin();

        if ( !fecha || !descripcion  || !nameEvent || !categories.length) { return faltanCasillas() }
        setCreando(true);
        

        const url = await fileUpload(file)
        


        const post:any = {
            nombreDelEvento: nameEvent,
            direccion: ubicacion,
            horaDeInicio: fecha.slice(11),
            autor: authGoo.logNormal.uid,
            invitados: numeroPersonas,
            precio,
            fecha: fecha.slice(0, 10).split("").join(""),
            descripcion,
            imagen: url,
            coordenadas: coordenadasPadre,
            categorias:categories
        }
        console.log("post", post)
        

        async function fetchPost(data: object) { 
            try {
                const {data}: {data:any} =  await axios.post(`${URLrequests}events/create`, post)
                console.log("data",data);
                
                if (data.message === 'Evento creado') {

                    eventoCreado();
                    setNameEvent("");
                    setUbicacion("");
                    setNumeroPersonas(0);
                    setPrecio(0);
                    setFecha("");
                    setDescripcion("");
                    setCreando(false);

                } else {
                    faltanCasillas();
                    setCreando(false);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchPost(post)
        console.log("constPost", post) 
    };



const Checked=(value:string)=>{

    const categorias:boolean=categories.some((i:string)=>i===value)
    if(!categorias){
        setCategorias([...categories,value])
    } else{
        const filter:[]=categories.filter((i:string)=>i !== value)
        setCategorias(filter)
    }

}
    //Return del componente----------------------------------------------------------------------------

    return (
        <div>
            <Nav />
            <div className="container container-Nevent">
                <div className="row">
                    <div className="col-lg-6 col-sm-12  ">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="form-group col-md-6 ">
                                    <label>Nombre del evento</label>
                                    <input
                                        className="form-control"
                                        placeholder="Escribe el nombre del evento"
                                        type="text"
                                        value={nameEvent}
                                        onChange={(e) => setNameEvent(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className="form-group col-md-5 col-sm-12 ">
                                    <label>Ubicación</label>
                                    <input
                                        className="form-control"
                                        placeholder="Dirección del evento"
                                        type="text"
                                        value={ubicacion}
                                        onChange={(e) => setUbicacion(e.target.value)}
                                    >
                                    </input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-4 col-sm-12 ">
                                    <label>Cantidad de asistentes</label>
                                    <input
                                        type="number"
                                        min={0}
                                        value={numeroPersonas}
                                        onChange={(e) => setNumeroPersonas(parseInt(e.target.value))}
                                    >
                                    </input>
                                </div>
                                <div className="form-group col-md-4 col-sm-12 ">
                                    <label>Valor del ingreso</label>
                                    <input
                                        type="number"
                                        min={0}
                                        value={precio}
                                        onChange={(e) => setPrecio(parseInt(e.target.value))}
                                    >
                                    </input>
                                </div>
                                
                            </div>
                            <div className="row"> 
                                
                                <div className="form-group col-md-9 col-sm-12">
                                    <label>Fecha</label>
                                    <input
                                        type="datetime-local"
                                        min={hoy}
                                        value={fecha}
                                        onChange={(e) => setFecha(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className="custom-file col-md-11">
                                <input type="file" onChange={handleFileChange} className="custom-file-input" id="customFile" />
                                <label className="custom-file-label" htmlFor="customFile">{file.name || "Adjuntar imagen"}</label>
                            </div>
                            <div className="form-group col-md-11">
                                <label>Descripción del evento</label>
                                <textarea
                                    className="form-control"
                                    placeholder="Descripción del evento, detalles, cuidades, etc"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="form-group col-md-11">
                                <label>Selecciona al menos una categoría</label>
                                
                                    
                                    
                                    
                                
                            
                                {/* onChange={(e) => setCategorias([...categorias,e.target.value])} */}
                                {categorias.map((i:string)=>
                                <div className="form-check">
                                        <input  className="form-check-input"  type="checkbox" value={i}  id="flexCheckDefault" key="categorias" onChange={(e)=>Checked(e.target.value)}/>                                   
                                    {i}                                    
                                    </div>
                                )}

                            </div>
                            <div className="form-group col-md-11">
                                {creando && <button disabled className="btn btn-success col-md-12  btn-lg">Creando evento</button>}
                                {!creando && <button className="btn btn-success col-md-12  btn-lg">Crear evento</button>}
                                
                            </div>
                        </form>
                    </div>

                    <div className="col-6">
                        <p>Haga click 1 vez para ver su localización actual, haga un segundo click para poner un marcador donde será el evento</p>
                        <Mapa onCambio={llenarEstadoCoordenadas} />
                    </div>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />
            </div>



            {/* <div className="container container-Nevent">
                <form onSubmit={handleSubmit} className="form">
                    <div className="divDeLaUl">
                        <ul className="Lista">
                            <li>
                                <label>Nombre del evento</label>
                                <input
                                    placeholder="Nombre del evento"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}></input>
                            </li>

                            <li>
                                <label>Ubicacion</label>
                                <input
                                    placeholder="Ubicacion del evento"
                                    type="text"
                                    value={ubicacion}
                                    onChange={(e) => setUbicacion(e.target.value)}
                                ></input>
                            </li>

                            <li>
                                <label>Numero de Personas</label>
                                <input
                                    type="number"
                                    value={numeroPersonas}
                                    onChange={(e) => setNumeroPersonas(parseInt(e.target.value))}
                                ></input>
                            </li>

                            <li>
                                <label>Publico o Privado</label>
                                <select
                                    value={publicoOPriv}
                                    onChange={(e) => setPublicoOPriv(e.target.value)}
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
                                    onChange={(e) => setPrecio(parseInt(e.target.value))}
                                ></input>
                            </li>

                            <li>
                                <label>Fecha</label>
                                <input
                                    type="date"
                                    value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                ></input>
                            </li>
                            <li>
                                <label>Imagen</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                ></input>
                            </li>
                        </ul>
                    </div>
                    <div className="inputTextarea">
                        <label>Description</label>
                        <textarea
                            placeholder="Descripcion del evento, detalles, cuidades, etc"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <label>Localizacion</label>
                        <br />
                        <p>Haga click 1 vez para ver su localizacion actual, haga un segundo click para poner un marcador donde sera el evento</p>
                        <div className="divMapa">
                            <Mapa onCambio={llenarEstadoCoordenadas} />
                        </div>

                    </div>

                    <button>Crear</button>
                </form>
            </div> */}
        </div>
    )
};