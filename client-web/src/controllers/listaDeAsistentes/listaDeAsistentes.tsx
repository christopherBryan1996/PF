import URLrequests from "../../components/constanteURL";
import { getAsistentes } from "../../actions/actions";
import axios from 'axios'


export const agregarTarea = async (
  tarea: string, 
  name: string,
  idUser: string,
  idEvento: string, 
  dispatch: any, 
  socket:any) => {
    await axios.patch(`${URLrequests}api/users/addtask/${idUser}/${idEvento}`, {tarea});
    dispatch(getAsistentes(idEvento))   
   
    socket.emit("postNotification",{
      receiverUID: idUser, 
      message: `${name} te ha asignado una nueva tarea: ${tarea}`
    } ) 
  };


export const eliminarTarea = async (tarea: string, idUser: string, idEvento: string, dispatch: any, socket:any) => {
  
  await axios.patch(`${URLrequests}api/users/deleteTask/${idUser}/${idEvento}`, {tarea});
    dispatch(getAsistentes(idEvento))
};

//Agregar alerta para confirmar eliminacion de asistente
export const eliminarAsistente = async ( id: string, idEvento: string, dispatch: any, socket:any) => {
        await axios.patch(`${URLrequests}api/users/deleteeventstoassist/${id}/${idEvento}`);
        dispatch(getAsistentes(idEvento))
};

