import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Nav } from "./Nav";
import { getAsistentes } from "../actions/actions";
import Asistente from "./Asistente";
import { Iasistentes } from "../interfaces/interfaces";
import "./styles/AsistentesPage.css";
import { Modal } from "./modal/Modal";
import { BotonEliminar } from './modal/styled';
import {
  agregarTarea,
  eliminarTarea,
  eliminarAsistente,
} from "../controllers/listaDeAsistentes/listaDeAsistentes";


export default function AsistentesPage( ): JSX.Element {
  const { eventid, uid }: { eventid: string; uid: string } = useParams();

  const { authGoo, eventos } = useSelector((state: any) => state);

  const dispatch: any = useDispatch();
   const [ estadoModal, setestadoModal] = useState(true)
   const [ userId, setuserId] = useState('')
   const [ eventName, seteventName] = useState('')
   const [ name, setname] = useState('')
   const [ eventId, seteventId] = useState('')
   const [ socket, setsocket] = useState('')

  useEffect(() => dispatch(getAsistentes(eventid)), []);

   const handleOnclick = (userId: string, eventName: string, name: string, eventId: string, socket: any ) => {
    setestadoModal(true)
    setuserId(userId)
    seteventName(eventName)
    setname(name)
    seteventId(eventId)
    setsocket(socket)
    
}
  //verifico que el usuario logueado coincida con el autor del evento
  return authGoo.logNormal && uid === authGoo.logNormal.uid ? (
    <div className="containerAsistentes">
    <Modal
                estado={estadoModal}
                cambiarEstado={setestadoModal}>
                <h4>Seguro quiere eliminar el evento?</h4>
                <BotonEliminar onClick={() => {  
                  eliminarAsistente(userId,
                  eventName,
                  name,
                  eventId,
                  dispatch,
                  socket);
                  setestadoModal(false) }} >
                        Eliminar
                        </BotonEliminar>
                    </Modal>
      <h2>Lista de Asistentes</h2>
      <Nav />
      <div className="container p-4">     
        {eventos.asistentesEvento && eventos.asistentesEvento.length ? (
          eventos.asistentesEvento.map((asist: Iasistentes) => (
            <div key={asist.usuario} className="card card-body mt-2">
            <Asistente
                handleOnclick={handleOnclick}
                eventName={eventos.evento}
                eventId={eventid}
                usuario={asist.usuario.length && asist.usuario[0].usuario}
                avatar={asist.usuario.length && asist.usuario[0].avatar}
                userId={asist.usuario.length && asist.usuario[0]._id}
                tareasDelUsuario={asist.tareasDelUsuario}
              />
            </div>
          ))
        ) : (
          <div>
            <p>Aún no hay asistentes a este evento</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div></div>
  );
}
