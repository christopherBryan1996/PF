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
  const [eventsToAssist, seteventsToAssist] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    if (tareas.userTasks?.length && eventosAsistir.eventsToAssist?.length) {
      seteventsToAssist(eventosAsistir.eventsToAssist);
      setTasks(tareas.userTasks)

    }
    else {
      setEventos(eventosAsistir.eventsToAssist);
    }


  }, [eventosAsistir, tareas])

  useEffect(() => {

    configEventos()
  }, [tasks])

  function configEventos() {
    console.log(tasks, "tasks")
    let listaeventos = []

    for (var i = 0; i < eventsToAssist.length; i++) {
      let flag = false;
      for (var j = 0; j < tasks.length; j++) {
        if (
          tasks[j].eventId &&
          eventsToAssist[i].eventId._id === tasks[j].eventId._id
        ) {
          listaeventos.push({
            ...eventsToAssist[i],
            tareas: tasks[j].tareasDelUsuario,
          })

          flag = true;

        }
      } if (!flag) {
        listaeventos.push({ ...eventsToAssist[i], tareas: [] })


      }

    }
    setEventos(listaeventos)


  }


  return (
    <div>
      <div className="divDelNav"> 
        <Nav></Nav>
      </div>

      <h1>Eventos a asistir</h1>

      {eventos && eventos.length ? (
        <div>
          {eventos.map((i: { eventId: {}; tareas: [] }) => (
            <div className="container p-4">
              <TarjetaEventosAsistir eventId={i.eventId} tareas={i.tareas} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{textAlign:"center", marginTop:"40px"}}>
          <h6>
            No tienes eventos a asistir
          </h6>
        </div>
      )}
    </div>
  );

}
