import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./styles/EventDetails.css";
import { FaCalendarAlt } from "react-icons/fa"
import { FiShoppingCart, FiUserPlus } from "react-icons/fi";
import imag from '../images/bolos.jpg';
import { useEffect, useState } from "react";
import { getEvent, userAsistiraEvento } from "../actions/actions"
import Mapa1evento from "./Mapa1evento";
import { ToastContainer, toast } from 'react-toastify';
import { Nav } from "./Nav";
import Foot from "./Foot";
import axios from 'axios';
import URLrequests from "./constanteURL";
import { useLocation } from "react-router";




export default function EventDetails() {

    //NOTIFICACIONES------------------------------------------------------------------------------
    const asistire = () => toast.success('Ahora figuras como que asistiras al evento', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    //CONSTANTS USE EFFECT Y VARIABLES------------------------------------------------------------------------------
    const url = window.location.pathname;

    const [loading, setLoading] = useState<boolean>(true)
    const { eventid }: { eventid: string } =
        useParams();
    console.log('event:', eventid);

    const dispatch = useDispatch()

    const evento = useSelector((state: any) => state.eventos.evento)
    const { authGoo } = useSelector((state: any) => state);

    useEffect(() => {
       
        dispatch(getEvent(eventid));
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, []);
//Con esto me fijo si cuando volvio de hacer la compra en los query hay un aprobado-------------------------------
    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const paramFieldStatus = query.get('collection_status');
    const paramFieldPayment_id= query.get("payment_id")
    console.log("paramField", paramFieldStatus, "usuariologeado", authGoo.logNormal.uid, "payment_id", paramFieldPayment_id)

    if (paramFieldStatus === "pending" || paramFieldStatus === "approved" ){
        
        const infoEnviar = {
            status: paramFieldStatus,
            userID: authGoo.logNormal.uid,
            enventID: eventid,
            mount: evento.price,
            payment_id: paramFieldPayment_id 
        }

        console.log("infoEnviar", infoEnviar)
        const despacharStatus = async (data:any) => {
            try {
                const {data}: {data:any} =  await axios.post(`${URLrequests}api/payment/new`, infoEnviar) //tenes q cambiar esta ruta
                console.log("data",data);
    
            } catch (error) {
                console.error(error);
            };
        }
        despacharStatus(infoEnviar)
    }
    

//Funciones de los botones de Asistire y de Comprar entrada-------------------------------------------------------
    const agregarGenteAsistir = () => {
        authGoo.logNormal &&
            dispatch(userAsistiraEvento(authGoo.logNormal.uid, evento._id))
        asistire();
    }
//Funcion para despachar la compra de una entrada POST------------------------------------------------
    const [cantidad, setCantidad] = useState(1);

    const comprarEntrada = () => {
        const post = {
            title: evento.nombreDelEvento,
            price: evento.precio,
            quantity: cantidad,
            eventID: eventid
        }
        async function fetchPost(data:any) {
            try {
                const {data}: {data:any} =  await axios.post(`${URLrequests}api/payment/new`, post)
                console.log("data",data);
    
                if (data.LinkMP) {
                    window.open(data.LinkMP);
                    //window.open para nueva tab % window.location.assign en la misma tab
                   
    
                } else if  (data.err){
                    alert("error al crear el link");
    
                }
            } catch (error) {
                console.error(error);
            };
        }
        fetchPost(post)
        console.log("constPost", post) 

    }


//Variables de como llegan los estados PrivadoOpublico---------------------------------------------------------------
    var privadoOpublico = evento.publico;
    var final = "Publico - Cualquiera puede asistir";
    if (privadoOpublico === false) { final = "Privado - Solo invitados" };


    //return del componente------------------------------------------------------------------------------

    return evento.imagen && !loading ? (
        <div className="container container-detail" >
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

            <Nav />

            <div className="card-contai">

                <div className="card " >

                    <h3 className="card-title">{evento.nombreDelEvento}</h3>

                </div>
                <div className="card">
                    <img className="card-img-top" src={evento.imagen} alt="Card image cap" height="300" width="00" />
                </div>
                <div className="card container-card-detail" >
                    <p>Hora: <span>{evento.horaDeInicio}</span>  </p>
                    <p>Ubicacion: <span>{evento.direccion}</span>  </p>
                    <p>Asistentes: <span>{evento.asistentes.length}</span></p>
                    <p>Precio: <span>{evento.precio}$ (moneda local)</span></p>
                    <p>Publico: <span>{final}</span></p>

                </div>
                <button className="btn btn-success col-md-12">
                    {privadoOpublico && evento.precio === 0 && <div onClick={agregarGenteAsistir}> <FiUserPlus size="2em" color="white" />
                        <p>Asistire al evento</p>  </div>}

                    {evento.precio !== 0 && 
                    <div onClick={comprarEntrada}> 
                    <FiShoppingCart size="2em" color="white" />
                     <p>Comprar Entradas</p> 
                     <input type="number" value={cantidad} onChange={(e)=> setCantidad(parseInt(e.target.value))}></input>
                     </div> }   

                </button>

                <div className="card-contai2" >
                    <Mapa1evento />
                </div>

                <Foot />
            </div>








            {/* <div className="card card-details ">

                <img className="card-img-top" src={evento.imagen} alt="Card image cap" height="400" />
                <div className="card-body">

                    <h5 className="card-text"> <span><FaCalendarAlt color="white" /></span> {evento.fecha.split("T")[0]}</h5>
                    <h3 className="card-title">{evento.nombreDelEvento}</h3>
                </div>
                <div className="card-footer">
                    <p>Hora: <span>{evento.horaDeInicio}</span>  </p>
                    <p>Ubicacion: <span>{evento.direccion}</span>  </p>
                    <p>Asistentes: <span>{evento.asistentes.length}</span></p>
                    <p>Precio: <span>{evento.precio}$ (moneda local)</span></p>
                    <p>Publico: <span>{final}</span></p>
                </div>
                <div className="card-footer">
                    <p>Descripción: <span>{evento.descripcion}</span>  </p>
                </div>
                <div className="card-footer">
                    {!privadoOpublico && <div><FiShoppingCart size="2em" color="white" />
                        <p>Adquirir Boletos</p></div>}
                </div>
                <div className="card-footer">
                    {privadoOpublico && evento.precio === 0 && <div onClick={agregarGenteAsistir}> <FiUserPlus size="2em" color="white" />
                        <p>Asistire al evento</p>  </div>}
                </div>

            </div>
            <div className="card-details ">

                {/* <img className="card-img-top" src={mapa} alt="Card image cap" height="600" /> */}
            {/* <div >
                    <Mapa1evento />
                </div> */}
            {/* </div> */}


            {/* } */}

        </div>
    ) : (
        <div className="loading">
            <img src="https://i.gifer.com/VAyR.gif" alt="loading...." />
        </div>
    )
}