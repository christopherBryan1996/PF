import { useState,useEffect } from "react";
import { fileUpload } from "../helpers/fileUpload";
import './styles/NewEvent.css';
import { ToastContainer, toast } from 'react-toastify';
import Mapa from './Mapa';
import { Nav } from "./Nav";
import axios from "axios";
import {useSelector,useDispatch} from 'react-redux';
import URLrequests from "./constanteURL";
import { getEvent } from "../actions/actions";
import {  useParams } from "react-router-dom";

export default function ModificarEvento() {
    
    const { eventid }: { eventid: string } = useParams()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEvent(eventid));
    }, []);
    const {authGoo}=useSelector((state:any)=>state)
    const {evento}:{evento:any}=useSelector((state:any)=>state.eventos)
    console.log(evento,"hola")


    //Estados------------------------------------------------------------------------------------------
    const infoEvento=evento;
    
    // const [nameEvent, setNameEvent] = useState<string>(nombreDelEvento);
    // console.log(nameEvent,"name")
    // console.log(evento.nombreDelEvento,"e.jo")
    const [state,setState]=useState(infoEvento);
    useEffect(()=>{setState(infoEvento)})
    // const [ubicacion, setUbicacion] = useState("");
    // const [publicoOPriv, setPublicoOPriv] = useState("publico");
    // const [numeroPersonas, setNumeroPersonas] = useState(0);
    // const [precio, setPrecio] = useState(0);
    // const [fecha, setFecha] = useState("");
    // const [descripcion, setDescripcion] = useState("");
    // const [coordenadasPadre, setCoordenadasPadre] = useState({ lat: 1, lng: 1 });
    // const [file, setFile] = useState(null || "")
    const [creando, setCreando] = useState(false);

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


    // function llenarEstadoCoordenadas(data: any) {
    //     console.log("data", data)
    //     setCoordenadasPadre(data)
    // };

    function handleOnChange(e:any){
        setState((prevState:any)=>{
            return{
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
        
       
    }
    //Funcion para enviar el post del form----------------------------------------------------------------

    // const handleFileChange = (e: any) => {

    //     const pic = e.target.files[0]
    //     setFile(pic);

    // }
    // console.log(file)

    // const handleSubmit = async (e: any) => {

    //     e.preventDefault();
        
    //     //!nameEvent
    //     if (!publicoOPriv  || !fecha || !descripcion  || !fecha ) { return faltanCasillas() }
    //     setCreando(true);
    //     let publicVar = true;
    //     if (publicoOPriv === "true") publicVar = true;
    //     if (publicoOPriv === "false") publicVar = false;

    //     const url = await fileUpload(file)
        


    //     const post:any = {
    //         // nombreDelEvento: nameEvent,
    //         direccion: ubicacion,
    //         horaDeInicio: "20:30",
    //         autor: authGoo.logNormal.uid,
    //         publico: publicVar,
    //         invitados: numeroPersonas,
    //         precio,
    //         fecha,
    //         descripcion,
    //         imagen: url,
    //         coordenadas: coordenadasPadre
    //     }
    //     console.log("post", post)


    //     async function fetchPost(data: object) {
    //         try {
    //             const {data}: {data:any} =  await axios.post(`${URLrequests}events/create`, post)
    //             console.log("data",data);
                
    //             if (data.message === 'Evento creado') {

    //                 eventoCreado();
    //                 // setNameEvent("");
    //                 setUbicacion("");
    //                 setNumeroPersonas(0);
    //                 setPrecio(0);
    //                 setFecha("");
    //                 setDescripcion("");
    //                 setCreando(false);

    //             } else {
    //                 faltanCasillas();
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     fetchPost(post)
    //     console.log("constPost", post) 
    // };

    
    // console.log(filtrado,"jo")

   
   
    //Return del componente----------------------------------------------------------------------------

    return  (
        <div>
            <Nav />
            <div className="container container-Nevent">
                <div className="row">
                    <div className="col-lg-6 col-sm-12  ">
                        <form >{/*onSubmit={handleSubmit}*/}
                            <div className="row">
                                <div className="form-group col-md-6 ">
                                    <label>Nombre del evento</label>
                                    <input
                                        className="form-control"
                                        // placeholder="Nombre del evento"
                                        type="text"
                                        value={state.nombreDelEvento}
                                        name="nombreDelEvento"
                                        // defaultValue={evento.nombreDelEvento}
                                        onChange={handleOnChange}
                                        
                                    >
                                    </input>
                                </div>
                                {/* <div className="form-group col-md-5 col-sm-12 ">
                                    <label>Ubicacion</label>
                                    <input
                                        className="form-control"
                                        // placeholder={filtrado[0].direccion}
                                        type="text"
                                        value={ubicacion}
                                        onChange={(e) => setUbicacion(e.target.value)}
                                    >
                                    </input>
                                </div>
                            </div> */}
                            {/* <div className="row">
                                <div className="form-group col-md-6 col-sm-12 ">
                                    <label>Cantidad de asistentes</label>
                                    <input
                                        
                                        type="number"
                                        // defaultValue={filtrado[0].asistentes.length}
                                        onChange={(e) => setNumeroPersonas(parseInt(e.target.value))}
                                    >
                                    </input>
                                </div> */}
                                {/* <div className="form-group col-md-1 ">
                                    <label>Tipo</label>
                                    <select
                                        className="form-select form-select-lg "
                                        value={publicoOPriv}
                                        onChange={(e) => setPublicoOPriv(e.target.value)}
                                    >
                                        <option value="true" >Publico</option>
                                        <option value="false" >Privado</option>
                                    </select>
                                </div>
                            </div> */}
                            {/* <div className="row">
                                <div className="form-group col-md-5 ">
                                    <label>Valor del ingreso</label>
                                    <input
                                        type="number"
                                        // value={filtrado[0].precio}
                                        onChange={(e) => setPrecio(parseInt(e.target.value))}
                                    >
                                    </input>
                                </div> */}
                                {/* <div className="form-group col-md-2 col-sm-12">
                                    <label>Fecha</label>
                                    <input
                                        type="date"
                                        // value={filtrado[0].fecha.slice(0,10)}
                                        onChange={(e) => setFecha(e.target.value)}>
                                    </input>
                                </div>
                            </div> */}
                            {/* <div className="custom-file col-md-11">
                                <input type="file" onChange={handleFileChange} className="custom-file-input" id="customFile" />
                                <label className="custom-file-label" htmlFor="customFile">Adjuntar imagen</label>
                            </div> */}
                            {/* <div className="form-group col-md-11">
                                <label>Descripcion del evento</label>
                                <textarea
                                    className="form-control"
                                    // placeholder={filtrado[0].descripcion}
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="form-group col-md-11">
                                {creando && <button disabled className="btn btn-success col-md-12  btn-lg">Creando evento</button>}
                                {!creando && <button className="btn btn-success col-md-12  btn-lg">Crear evento</button>} */}
                                
                            </div>
                        </form>
                        
                    </div>

                    <div className="col-6">
                        <p>Haga click 1 vez para ver su localizacion actual, haga un segundo click para poner un marcador donde sera el evento</p>
                        {/* <Mapa onCambio={llenarEstadoCoordenadas} /> */}
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



        
        </div>
    )
};