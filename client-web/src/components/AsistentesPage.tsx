import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAsistentes } from "../actions/actions";
import Asistente from "./Asistente";
import { Iasistentes, IasistentesAEvento } from "../interfaces/interfaces";

//evento de prueba -> id: 616f6f4fdb5f15a30b5e3fdd


export default function AsistentesPage(): JSX.Element {
  const { eventid }: { eventid: string } =    useParams();

  const dispatch: any = useDispatch();
  useEffect(() => dispatch(getAsistentes(eventid)), []);

  const { asistentesEvento }: { asistentesEvento: IasistentesAEvento } = useSelector(
    (state: any) => state.eventos
  );
 
     const listaDeAsistentes: Iasistentes[] = asistentesEvento.asistentes

  return (
    <div>
      {listaDeAsistentes.length?
      listaDeAsistentes.map((asist: Iasistentes) => (
        <div key={asist.usuario}>
             <Asistente
          usernameDelAsistente={asist.usuario}
          tareasdelAsistente={asist.tareasDelUsuario}
        />
        </div>             
      )): <div><p>Aún no hay asistentes a este evento</p></div>}
    </div>
  );
}
