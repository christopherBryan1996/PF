import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { getEventosAsistir, getTareas } from "../actions/actions";
import TarjetaEventosAsistir from "./TarjetaEventosAsistir";

export default function EventosAsistir(): JSX.Element {
  const { uid }: { uid: string } = useParams();
  
  
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getEventosAsistir(uid));
      dispatch(getTareas(uid));
    }, []);
    
    const { eventosAsistir }: { eventosAsistir: any } = useSelector(
        (state: any) => state.eventos
        );
    const { tareas }: { tareas: any } = useSelector(
        (state: any) => state.eventos
        );
        console.log("EVENTOS A ASISTIR", eventosAsistir);
        console.log("tareas", tareas);
    const [eventos, setEventos] = useState<any[]>([]);
    const [eventsToAssist,seteventsToAssist]=useState<any[]>([]);
    const [tasks,setTasks]=useState<any[]>([])

  useEffect(()=>{
      if (tareas.userTasks?.length && eventosAsistir.eventsToAssist?.length ) {
        seteventsToAssist(eventosAsistir.eventsToAssist);
        setTasks(tareas.userTasks)
        configEventos()
    }
    else {
        setEventos(eventosAsistir.eventsToAssist);

        
    }
  },[eventosAsistir,tareas])

      function configEventos(){
          console.log(tasks,"tasks")
        for (var i = 0; i < eventsToAssist.length; i++) {
            if (eventsToAssist[i].eventId) {
            for (var j = 0; j < tasks.length; j++) {
                if (
                  tasks[j].eventId &&
                eventsToAssist[i].eventId._id === tasks[j].eventId._id
                ) {
                setEventos([
                    ...eventos,
                    {
                    ...eventsToAssist[i],
                    tareas: tasks[j].tareasDelUsuario,
                    },
                ]);
                } else  {
                setEventos([...eventos, { ...eventsToAssist[i], tareas: [] }]);
                }
            }
            }
        }
   
        
    }

  console.log(eventos,"EVENTOS22222222")  
  
  return (
    <div>
      <div className="divDelNav">
        <Nav></Nav>
      </div>
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
      {eventos && eventos.length ? (
        <div>
          {eventos.map((i: { eventId: {}; tareas: [] }) => (
            <div>
              <TarjetaEventosAsistir eventId={i.eventId} tareas={i.tareas} />
            </div>
          ))}
        </div>
      ) : (
        <div>No tienes eventos a asistir</div>
      )}
    </div>
  );
}