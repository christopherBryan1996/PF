import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Nav } from './Nav';
import { getAsistentes } from "../actions/actions";
import Asistente from "./Asistente";
import { Iasistentes } from "../interfaces/interfaces";
import './styles/AsistentesPage.css'

//evento de prueba -> id: 616f6f4fdb5f15a30b5e3fdd


export default function AsistentesPage(): JSX.Element {
  const { eventid }: { eventid: string } =    useParams();

  const dispatch: any = useDispatch();
  useEffect(() => dispatch(getAsistentes(eventid)), []);

  const { asistentesEvento }: { asistentesEvento: [] } = useSelector(
    (state: any) => state.eventos
  );
 
  return (
    <div className="containerAsistentes">
      <h2>Lista de Asistentes</h2>
      <Nav/>
       <div className='container p-4'>
        {asistentesEvento.length?
        asistentesEvento.map((asist: Iasistentes) => (
          <div key={asist.usuario} className="card card-body mt-2">
              <Asistente
                id={eventid}
                usuario={asist.usuario}
                tareasDelUsuario={asist.tareasDelUsuario}
          />
          </div>             
        )): <div>
            <p>Aún no hay asistentes a este evento</p>
          </div>}
       </div>
    </div>
  );
}
