import React, { useState } from "react";
import { Iasistentes } from "../interfaces/interfaces";
import "./styles/Asistente.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAsistentes } from "../actions/actions";
import axios from 'axios'


type FormElement = React.FormEvent<HTMLFormElement>;

export default function Asistente(props: Iasistentes): JSX.Element {
  const [nuevaTarea, setNuevaTarea] = useState<string>("");
  const [tareasVisibles, setTareasVisibles] = useState(false);
  const dispatch: any = useDispatch();
  
  const { uid, name }=useSelector((state:any)=>state.authGoo.state)
  useEffect(() => dispatch(getAsistentes(props.id)), []);

 

  //https://api-fest.herokuapp.com/events/assistans/delTarea/:id
  //http://localhost:3008/events/assistans/delTarea
  //{usuario, tareasDelUsuario}

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    // agregarTarea(nuevaTarea);
    // setNuevaTarea("");
  };

  // const agregarTarea = (tarea: string): void => {
  //   const listaTareas: string[] = [...tareas, tarea];
  //   setTareas(listaTareas);
  // };

  const eliminarTarea = async (idEvento: string, tarea: string) => {
    // const listaTareas: string[] = tareas.filter((t) => t !== tarea);
    
    const obj = {usuario:name, tareasDelUsuario: tarea }
      const tareaEliminada = await axios.patch(`http://localhost:3008/events/assistans/delTarea/${idEvento}`, obj);
      dispatch(getAsistentes(idEvento))
  };

  const desplegarTareas = (): void => {
    setTareasVisibles(!tareasVisibles);
  };

  //Agregar alerta para confirmar eliminacion de asistente
  const eliminarAsistente = async (idEvento: string, usuario: string) => {

        const obj = {usuario}
        console.log('objeto usuario: ', obj)
        const deleted = await axios.put(`http://localhost:3008/events/assistans/delete/${idEvento}`, obj);
        console.log(deleted)
        dispatch(getAsistentes(idEvento))
      };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card-name">
            {props.usuario}
            <button onClick={desplegarTareas} type="button" className="btn btn-outline-success">tareas</button>
            <button onClick={() => eliminarAsistente(props.id, props.usuario)} type="button" className="btn btn-outline-danger">Eliminar Asistente</button>
          </div>
          {!tareasVisibles ? null : (
            <div className={"card-body"}>
              {props.tareasDelUsuario?.map((tarea: string, idx: number) => (
                <div className="card card-body mt-2" key={idx}>
                  <p>{tarea}</p>
                  <button onClick={() => eliminarTarea(props.id, tarea)} type="button" className="btn btn-outline-danger">X</button>
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
