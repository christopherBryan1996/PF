import React, { useState } from "react";
import { Iasistentes } from "../interfaces/interfaces";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  agregarTarea,
  eliminarTarea,
  eliminarAsistente,
} from "../controllers/listaDeAsistentes/listaDeAsistentes";

import "./styles/Asistente.css";

type FormElement = React.FormEvent<HTMLFormElement>;

export default function Asistente(props: Iasistentes): JSX.Element {
  const [nuevaTarea, setNuevaTarea] = useState<string>("");
  const [tareasVisibles, setTareasVisibles] = useState(false);
  const dispatch: any = useDispatch();

  const { authGoo, socketIO } = useSelector((state: any) => state);

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    socketIO.socket &&
    agregarTarea(nuevaTarea, 
      authGoo.logNormal.uid, 
      props.userId, 
      props.eventId, 
      dispatch, 
      socketIO.socket);
    setNuevaTarea("");
  };

  const desplegarTareas = (): void => {
    setTareasVisibles(!tareasVisibles);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card-name">
            {props.usuario}
            <button
              onClick={desplegarTareas}
              type="button"
              className="btn btn-outline-success"
            >
              tareas
            </button>
            <button
              onClick={() =>
                eliminarAsistente(props.userId, props.eventId, dispatch, socketIO.socket)
              }
              type="button"
              className="btn btn-outline-danger"
            >
              Eliminar Asistente
            </button>
          </div>
          {!tareasVisibles ? null : (
            <div className={"card-body"}>
              {props.tareasDelUsuario?.map((tarea: string, idx: number) => (
                <div className="card card-body mt-2" key={idx}>
                  <p>{tarea}</p>
                  <button
                    // onClick={() =>
                    //   eliminarTarea(tarea, props.usuario, props.id, dispatch, props.socket)
                    // }
                    type="button"
                    className="btn btn-outline-danger"
                  >
                    X
                  </button>
                </div>
              ))}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={nuevaTarea}
                  className="form-control"
                  placeholder="Nueva tarea.."
                  onChange={(e) => setNuevaTarea(e.target.value)}
                />
                <button className="btn btn-success btn-block mt-2">Save</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}