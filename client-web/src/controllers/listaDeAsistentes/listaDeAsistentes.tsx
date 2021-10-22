import URLrequests from "../../components/constanteURL";
import { getAsistentes } from "../../actions/actions";
import axios from 'axios'


export const agregarTarea = async (tarea: string, usuario: string, idEvento: string, dispatch: any) => {
    const obj = {usuario, tareasDelUsuario: tarea }
    await axios.patch(`${URLrequests}events/assistans/newTarea/${idEvento}`, obj);
    dispatch(getAsistentes(idEvento))    
  };


export const eliminarTarea = async (tarea: string, usuario: string, idEvento: string, dispatch: any) => {
    const obj = {usuario, tareasDelUsuario: tarea }
    await axios.patch(`${URLrequests}events/assistans/delTarea/${idEvento}`, obj);
    dispatch(getAsistentes(idEvento))
  };


//Agregar alerta para confirmar eliminacion de asistente
export const eliminarAsistente = async ( usuario: string, idEvento: string, dispatch: any) => {
        const obj = {usuario}
        await axios.put(`${URLrequests}events/assistans/delete/${idEvento}`, obj);
        dispatch(getAsistentes(idEvento))
      };

