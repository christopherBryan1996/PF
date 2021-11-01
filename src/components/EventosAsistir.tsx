import {  useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Nav } from './Nav';
import { getEventosAsistir } from "../actions/actions";
import TarjetaEventosAsistir from "./TarjetaEventosAsistir";



export default function EventosAsistir(): JSX.Element {
    const { uid }: { uid: string } = useParams()

    const dispatch = useDispatch();
    useEffect(() => {
        
        dispatch(getEventosAsistir(uid));
    }, []);
    
    const { eventosAsistir }: { eventosAsistir: any } = useSelector((state: any) => state.eventos)
    // const { eventsToAssist }: { eventsToAssist: any } = useSelector((state: any) => state.eventos.eventosAsistir)
    let eventos = []
    if ( eventosAsistir.eventsToAssist){
    const userTasks=eventosAsistir.userTasks;
    const eventsToAssist= eventosAsistir.eventsToAssist;
    

    // function simplificada(){
        if(userTasks)
        {for(var i=0;i<eventsToAssist.length;i++){
            for(var j=0;j<userTasks.length;j++){
                if((eventsToAssist[i].eventId._id===userTasks[j].eventId._id)){
                    eventos.push({...eventsToAssist[i], tareas:userTasks[j].tareasDelUsuario})
                }else{
                    eventos.push({...eventsToAssist[i], tareas:[]})
                }
            }
        }}else{eventos=eventsToAssist}
    
    console.log(eventos,"eventstoassist")
    }
    // const {nombreDelEvento}:{nombreDelEvento:any}=eventosAsistir.eventsToAssist[0].eventId
    return eventos.length ? (
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
        </div>
    ):<div>No tienes eventos a asistir</div>
}