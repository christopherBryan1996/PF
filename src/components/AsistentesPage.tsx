import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Nav } from "./Nav";
import { getAsistentes } from "../actions/actions";
import Asistente from "./Asistente";
import { Iasistentes } from "../interfaces/interfaces";
import "./styles/AsistentesPage.css";

export default function AsistentesPage( ): JSX.Element {
  const { eventid, uid }: { eventid: string; uid: string } =
    useParams();

  const { authGoo, eventos } = useSelector((state: any) => state);

  const dispatch: any = useDispatch();

  useEffect(() => dispatch(getAsistentes(eventid)), []);
  
  //verifico que el usuario logueado coincida con el autor del evento
  return authGoo.logNormal && uid === authGoo.logNormal.uid ? (
    <div className="containerAsistentes">
      <h2>Lista de Asistentes</h2>
      <Nav />
      <div className="container p-4">
        {eventos.asistentesEvento && eventos.asistentesEvento.length ? (
          eventos.asistentesEvento.map((asist: Iasistentes) => (
            <div key={asist.usuario} className="card card-body mt-2">
             <Asistente
                eventName={eventos.evento}
                eventId={eventid}
                usuario={asist.usuario[0].usuario}
                avatar={asist.usuario[0].avatar}
                userId={asist.usuario[0]._id}
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
