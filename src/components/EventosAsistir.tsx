import {  useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Nav } from './Nav';
import { getEventosAsistir, getTareas } from "../actions/actions";
import TarjetaEventosAsistir from "./TarjetaEventosAsistir";


export default function EventosAsistir(): JSX.Element {
    const { uid }: { uid: string } = useParams()

    const dispatch = useDispatch();
    useEffect(() => {
        
        dispatch(getEventosAsistir(uid));
        dispatch(getTareas(uid));
    }, []);

    const { eventosAsistir }: { eventosAsistir: any } = useSelector((state: any) => state.eventos)
    const { tareas }: { tareas: any } = useSelector((state: any) => state.eventos)
    console.log("EVENTOS A ASISTIR", eventosAsistir)
    console.log("tareas", tareas)

    
        
    let eventos = []
        if ( eventosAsistir.eventsToAssist){
            const eventsToAssist= eventosAsistir.eventsToAssist;
            if(tareas.userTasks){
            const userTasks=tareas.userTasks;//data.userTasks?data.userTasks:null
            
        
            if(userTasks)
            {for(var i=0;i<eventsToAssist.length;i++){

                if(eventsToAssist[i].eventId){
                for(var j=0;j<userTasks.length;j++){

                    
                    if((userTasks[j].eventId && eventsToAssist[i].eventId._id===userTasks[j].eventId._id)){
                        eventos.push({...eventsToAssist[i], tareas:userTasks[j].tareasDelUsuario})
                    }else if((userTasks[j].eventId && eventsToAssist[i].eventId._id!==userTasks[j].eventId._id)){
                        eventos.push({...eventsToAssist[i], tareas:[]})
                    }
                
                }
            }}}else{eventos=eventsToAssist}
        
            console.log(eventos,"eventstoassist")
        }
    }
        
    

    // const { eventsToAssist }: { eventsToAssist: any } = useSelector((state: any) => state.eventos.eventosAsistir)
    // const {nombreDelEvento}:{nombreDelEvento:any}=eventosAsistir.eventsToAssist[0].eventId
    return (
        <div>
            <div className="divDelNav"><Nav></Nav></div>
            <h1>Eventos a asistir</h1>
            {/* <div>{userTasks[0].eventId.nombreDelEvento}</div>  */}
            
            {/* <div>
                {eventos.map((i:any)=>(
                    <>
                    <div>
                    {i.eventId.nombreDelEvento} 
                    </div>
                    <div>
                    {i.tareas.length? i.tareas.map((i:any)=>(
                        <p>{i}</p>
                    )):null}   
                    </div>
                    </>
                ))}

            </div> */}
        { eventos.length ? 
            <div>

            {eventos.map((i:{
                eventId:{};
                tareas:[];
            })=>(
                <div>
            <TarjetaEventosAsistir eventId={i.eventId} tareas={i.tareas}/>
            </div>
            ))}

            </div>
            :<div>No tienes eventos a asistir</div>}
        </div>
    )
}