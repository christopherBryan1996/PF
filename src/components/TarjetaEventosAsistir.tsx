import React, { useState } from "react"
import { IeventosAsistir } from "../interfaces/interfaces";
import {borrarAsistencia} from "../controllers/asistirEventos/asistircontroller"
import {  useParams } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import "./styles/EventosAsistir.css";


export default function TarjetaEventosAsistir({eventId,tareas}:IeventosAsistir) {
    const { uid }: { uid: string } = useParams()
    const dispatch=useDispatch();
    const [tareasVisibles, setTareasVisibles] = useState(false);
    console.log(eventId,"eventid")
    console.log(tareas,"eid")

    const { authGoo, socketIO }: { authGoo: any; socketIO: any } = useSelector(
        (state: any) => state
      );
    
    const desplegarTareas = (): void => {
        setTareasVisibles(!tareasVisibles);
    };

    const fechacoratada = eventId.fecha
    const fechacorta=fechacoratada.slice(0,10)
    const fecha =new Date(fechacoratada).getTime()
    const fechahoy = new Date().getTime()
    
    const resta=fecha-fechahoy
    
    const numerfinal=Math.ceil(resta/8.64**7/24)
    
    
   



    return(
        <div className="containerasistir">
            <div className="barra">
                <div className="titulos">
                    <div className="titulossub">
                      <h4>{eventId.nombreDelEvento}</h4> 
                    </div>
                    
                    <div className="titulossubsub">
                         <h6>{fechacorta}</h6> <p>(Faltan {numerfinal} dias para el evento)</p>
                    </div>
                    
                </div>

                <div className="BotonYtareas">
                        <button  onClick={desplegarTareas} type="button" className="btn btn-outline-success" >
                        Tareas
                    </button>

                    <div className="tareasvisibles">
                    {!tareasVisibles ? null : ( 
                        <ul>
                        {(tareas && tareas.length)? tareas.map((i:any)=>(
                                <li>{i}</li>
                            )):null}  
                        </ul>
                    )}
                    </div>

                    <button  onClick={()=>borrarAsistencia(uid, authGoo.logNormal.name, socketIO.socket, eventId, dispatch, eventId.nombreDelEvento)} type="button" className="btn btn-outline-success" >
                        No voy a asistir
                    </button>
                </div>
                   


                

            </div>
        </div>
    )

//
}