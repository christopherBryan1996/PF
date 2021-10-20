import React, { useState } from "react";
import { Iasistentes } from "../interfaces/interfaces";
import './styles/Asistente.css'

type FormElement = React.FormEvent<HTMLFormElement>;

export default function Asistente(props:Iasistentes): JSX.Element {
  const [nuevaTarea, setNuevaTarea] = useState<string>('');
  const [tareas, setTareas] = useState<string[]>(props.tareasDelUsuario);
  const [tareasVisibles, setTareasVisibles] = useState(false)

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    agregarTarea(nuevaTarea);
    setNuevaTarea('');
  };

  const agregarTarea = (tarea: string): void => {
    const listaTareas: string[] = [...tareas, tarea];
    setTareas(listaTareas);
  };

  const eliminarTarea = (tarea: string): void => {
    const listaTareas: string[] = tareas.filter(t => t !== tarea)
    setTareas(listaTareas);
  };

  const desplegarTareas = (): void => {
    setTareasVisibles(!tareasVisibles)
  }
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
        <div className="card-name" >
            {props.usuario}
            <button  onClick={desplegarTareas}>tareas</button>
            <button>X</button>
        </div>
          {!tareasVisibles? null: <div className={"card-body"}>
            {tareas?.map((tarea: string, idx: number) => (
              <div className="card card-body mt-2" key={idx}>
                <p>{tarea}</p>              
                <button onClick={() => eliminarTarea(tarea)}>X</button>
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
          </div>}
        </div>
      </div>
    </div>
  );
}
