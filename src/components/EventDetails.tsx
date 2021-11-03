import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./styles/EventDetails.css";
import { FaCalendarAlt } from "react-icons/fa"
import { FiShoppingCart, FiUserPlus, FiTag } from "react-icons/fi";
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
import { useHistory } from "react-router-dom";

import FileDownload from 'js-file-download';
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { IoCopyOutline } from "react-icons/io5";




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
    const pagoConfirmado = () => toast.success('Tu pago se encuentra confirmado y ahora figuras como que asistiras al evento', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const pagoYaRealizado = () => toast.error('Ya compraste una entrada para este evento', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });const yaAsistes = () => toast.error('Ya figuras como que asistiras, descarga tu Entrada QR', {
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

    const dispatch = useDispatch()

    const evento = useSelector((state: any) => state.eventos.evento)
    const { authGoo, socketIO } = useSelector((state: any) => state);

    useEffect(() => {
       
        dispatch(getEvent(eventid));
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, []);

    const history = useHistory();
    const toEvent = () => {
        history.push(`/detail/${eventid}`)
    };

   
    //Funcion para enviar mail---------------------------------------------------------------------------------
    const enviarMailDeCompra = async() =>{
        try{

            const {data}: {data:any} =  await axios.get(`${URLrequests}api/users/${evento.autor}`);
            
            await axios.post(`${URLrequests}api/email/send-email`, 
                 {
                    mailDeAutor: data.user.email,
                    nombreDeComprador: authGoo.logNormal.name,
                    nombreDelEvento: evento.nombreDelEvento  
                }) 

        }catch(err){
            console.log(err)
        };
    }


 
            

//Con esto me fijo si cuando volvio de hacer la compra en los query hay un aprobado-------------------------------
    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const paramFieldStatus:any  = query.get('collection_status');
    const paramFieldPayment_id:any = query.get("payment_id");
    // console.log("paramField", paramFieldStatus, "usuariologeado", authGoo.logNormal.uid, "payment_id", paramFieldPayment_id)
    
    
//Funcion para agregar el pago a la DB-----------------------------------------------------------------------------------
const [confirmado, setConfirmado] = useState(false);
    const agregarPagoDB = async () =>{
    
            try {
                const {data}: {data:any} =  await axios.patch(`${URLrequests}api/payment/addpayment/${authGoo.logNormal.uid}/${eventid}`, 
                 {
                    status: paramFieldStatus.toString(),
                    mount: evento.precio,
                    payment_id: paramFieldPayment_id.toString() 
                }) 
                console.log("dataEnviadaRecibida",data);
            

            } catch (error) {
            console.error(error);
            };
    
     pagoConfirmado();
     enviarMailDeCompra();
     setConfirmado(true);
     const dataNotif = {
        uid: evento.autor,
        type: "newAsis",
        idEvento: evento._id,
         message: `${authGoo.logNormal.name} Compro la entrada y asistirá a tu evento ${evento.nombreDelEvento}`,
     }
     socketIO.socket.emit("postNotification", dataNotif);


     setTimeout(()=>toEvent() ,2000);
    };    

//Funciones de los botones de Asistire y de Comprar entrada-------------------------------------------------------

    const agregarGenteAsistir = async () => {

        const {data}: {data:any} =  await axios.get(`${URLrequests}events/assistans/${eventid}`)
        console.log("q asistesn", data)

         await data.asistentes.forEach((a:any)=>{
             console.log(a.usuario[0].usuario)
            if(a.usuario[0]._id === authGoo.logNormal.uid){
                 setConfirmado(true) 
                 console.log("lo paso a true el gil")
            }
        })

         if (confirmado === true){
            return yaAsistes();
        }else if (confirmado === false){

            authGoo.logNormal &&
            dispatch(userAsistiraEvento(authGoo.logNormal.uid, evento._id))
        asistire();
        setConfirmado(true);

         const dataNotif = {
           uid: evento.autor,
           type: "newAsis",
           idEvento: evento._id,
            message: `${authGoo.logNormal.name} asistirá a tu evento ${evento.nombreDelEvento}`,
        }
     socketIO.socket?.emit("postNotification", dataNotif);
    }
        }
        
        


        
//Funcion para despachar la compra de una entrada POST------------------------------------------------
    const [cantidad, setCantidad] = useState(1);

    const comprarEntrada = async () => {

        
            const check:any = await  axios.get(`${URLrequests}api/payment/getpayment/${authGoo.logNormal.uid}/${eventid}`)
            console.log("check", check)
            
            const post = {
            title: evento.nombreDelEvento,
            price: evento.precio,
            quantity: cantidad,
            eventID: eventid
        }
            console.log("postEnviar", post)
        async function fetchPost(data:any) {
            try {
                console.log("aca manito acaa")
                const {data}: {data:any} =  await axios.post(`${URLrequests}api/payment/new`, post)
                console.log("data",data);
    
                if (data.LinkMP) {
                    window.location.assign(data.LinkMP); 
                    //window.open para nueva tab % window.location.assign en la misma tab
                   
    
                } else if  (data.err){
                    alert("error al crear el link");
    
                }
            } catch (error) {
                console.error(error);
            };
        }    
            if (check.data.message === "Error al buscar pago"){
                fetchPost(post)


            }else if (check.data.status === "approved" || check.data.status === "in_process" || check.data.status === "incompleto" || check.data.status ===  "Aprobado" || check.data.status === "Incompleto"){

                pagoYaRealizado();
                setConfirmado(true)
            }

    }


//Variables de como llegan los estados PrivadoOpublico---------------------------------------------------------------
    var privadoOpublico = evento.publico;
    var final = "Publico - Cualquiera puede asistir";
    if (privadoOpublico === false) { final = "Privado - Solo invitados" };


//Funcion para conseguir QR----------------------------------------------------------------------------------
     const obtenerQR = async () => {
        
        // const {data}: {data:any} =  await axios.get(`${URLrequests}api/payment/sendqr/${authGoo.logNormal.name}-${eventid}.png`);
        

        axios({
            url: `${URLrequests}api/payment/sendqr/${authGoo.logNormal.name}-${eventid}.png`,
            method: 'GET',
            responseType: 'blob', // Important
          }).then((response:any) => {
              FileDownload(response.data, `Entrada a ${evento.nombreDelEvento}.png`);
          });
    }

    const toEventClipboard = (_id: any) => {

        var UrlCompartir = `http://localhost:3000/detail/${_id}`;
        navigator.clipboard.writeText(UrlCompartir);
        //seCopio();
    }


    //return del componente------------------------------------------------------------------------------

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

            <div className="container container-card-detalles">


                <div className="card mb-3 card-detalle" >
                    <div className="row no-gutters">
                        <div className="col-md-8">
                            <img className="card-img-top" src={evento.imagen} alt="Card image cap" height="400" width="400" />
                        </div>
                        <div className="col-md-4">
                            <div className="card-body">
                                <h4 className="card-title">{evento.nombreDelEvento}</h4>
                                <p className="card-text"><small className="text-muted">{evento.fecha.split("").slice(0, 10).join("")}</small></p>
                                <p className="card-text">{evento.descripcion}</p>
                                <p className="card-text"><small className="text-muted">{evento.precio === 0 ? 'Gratis ' : `Valor:  $${evento.precio} `}</small></p>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-success">
                            {privadoOpublico && evento.precio === 0 && <div onClick={agregarGenteAsistir}> <FiUserPlus size="2em" color="white" />
                                <p>Asistire al evento</p>  </div>}

                            {evento.precio !== 0 &&
                                <div onClick={comprarEntrada}>
                                    <FiShoppingCart size="2em" color="white" />
                                    <p>Comprar Entradas</p>

                                </div>}


                        </button>
                        {paramFieldPayment_id &&
                            <button className="btn btn-success">
                                <div onClick={(() => agregarPagoDB())}>
                                    <FiUserPlus size="2em" color="white" />
                                    <p>Confirma que compraste la entrada y asistiras al evento</p>

                                </div>
                            </button>}

                        {confirmado &&
                            <button className="btn btn-success" onClick={obtenerQR}>
                                <div >
                                    <FiTag size="2em" color="white" />
                                    <p>Obtiene tu QR de la entrada!</p>

                                </div>
                            </button>}



                    </div>
                    <div className="card-footer">
                        <span className="spa">Compartir con tus amigos</span>
                        <FacebookShareButton url={`https://flamboyant-golick-d7cb40.netlify.app/detail/${evento._id}`} quote='Hola, quiero compartir este evento'>
                            <FacebookIcon className="share" round={true} size='2em' />
                        </FacebookShareButton>
                        <WhatsappShareButton
                            title='Hola, te comparto este evento, te pueda interesar!'
                            url={`https://flamboyant-golick-d7cb40.netlify.app/detail/${evento._id}`}>
                            <WhatsappIcon className="share" round={true} size='2em' />
                        </WhatsappShareButton>
                        <button
                            className="botonCopy"
                            onClick={() => toEventClipboard(evento._id)}>
                            <IoCopyOutline></IoCopyOutline>
                        </button>

                    </div>
                </div>

                <div className="card-contai2" >
                    <Mapa1evento />
                </div>



            </div>

            {/* <div className="card-contai">

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
                <button className="btn btn-success">
                    {privadoOpublico && evento.precio === 0 && <div onClick={agregarGenteAsistir}> <FiUserPlus size="2em" color="white" />
                        <p>Asistire al evento</p>  </div>}

                    {evento.precio !== 0 &&
                        <div onClick={comprarEntrada}>
                            <FiShoppingCart size="2em" color="white" />
                            <p>Comprar Entradas</p>

                        </div>}


                </button>

                {paramFieldPayment_id &&
                    <button className="btn btn-success">
                        <div onClick={(() => agregarPagoDB())}>
                            <FiUserPlus size="2em" color="white" />
                            <p>Confirma que compraste la entrada y asistiras al evento</p>

                        </div>
                    </button>}

                {confirmado &&
                    <button className="btn btn-success" onClick={obtenerQR}>
                        <div >
                            <FiTag size="2em" color="white" />
                            <p>Obtiene tu QR de la entrada!</p>

                        </div>
                    </button>}




                <div className="card-contai2" >
                    <Mapa1evento />
                </div>

                <Foot />
            </div> */}
            <Foot />
        </div>
    ) : (
        <div className="loading">
            <img src="https://i.gifer.com/VAyR.gif" alt="loading...." />
        </div>
    )
}
