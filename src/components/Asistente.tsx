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
    agregarTarea(nuevaTarea,
      authGoo.logNormal.name,
      props.userId,
      props.eventId,
      props.eventName,
      dispatch,
      socketIO.socket);
    setNuevaTarea("");
  };

  const desplegarTareas = (): void => {
    setTareasVisibles(!tareasVisibles);
  };

  return (
    <div className="container ">   
      <div className="row">       
        <div className="col-md-12 offset-md-3">
          <div className="card-name">
            {props.usuario}
            <button
              onClick={desplegarTareas}
              type="button"
              className="btn btn-outline-success"
            >
             Asignar tareas
            </button>              
            <button
              onClick={() => props.handleOnclick(
                  props.userId,
                  props.eventName,
                  authGoo.logNormal.name,
                  props.eventId,
                  socketIO.socket)}
              type="button"
              className="btn btn-outline-danger"
              data-toggle="modal"
              data-target="#myModal"
            >
              Eliminar Asistente
            </button>
            <div className="modal" id="myModal">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">modal</span>
                  </button>
                  <div className="modal-body">
                    <p>{`Eliminar a ${props.usuario} de la lista de asistentes al evento`}</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary">Cerrar</button>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!tareasVisibles ? null : (
            <div className="card-body-asistent">
              {props.tareasDelUsuario?.map((tarea: string, idx: number) => (
                <div className="row-lista-tareas  mt-3" key={idx}>
                  <p className="mt-4">{tarea}</p>
                  <button
                    onClick={() =>
                      eliminarTarea(tarea,
                        props.eventName,
                        authGoo.logNormal.name,
                        props.userId,
                        props.eventId,
                        dispatch,
                        socketIO.socket)
                    }
                    type="button"
                    className="btn btn-outline-danger"
                  >
                    X
                  </button>
                </div>
              ))}
              <form onSubmit={handleSubmit}>
                <div className="form-group row">
                <input
                  type="text"
                  value={nuevaTarea}
                  className="form-control col-md-10 mt-3"
                  placeholder="Nueva tarea.."
                  onChange={(e) => setNuevaTarea(e.target.value)}
                />
                <button className="btn btn-success btn-block  mt-3">Save</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}