import URLrequests from "../../components/constanteURL";
import { getAsistentes } from "../../actions/actions";
import axios from 'axios'


export const agregarTarea = async (
  tarea: string, 
  uid: string,
  idUser: string,
  idEvento: string, 
  dispatch: any, 
  socket:any) => {
    const obj = {uid: idUser, tareasDelUsuario: tarea }
    await axios.patch(`${URLrequests}events/assistans/newTarea/${idEvento}`, obj);
    dispatch(getAsistentes(idEvento))   
   
    // socket.emit("postNotification",{
    //   senderName: idEvento, 
    //   receiverUID: usuario, 
    //   message: tarea
    // } ) 
  };


export const eliminarTarea = async (tarea: string, usuario: string, idEvento: string, dispatch: any, socket:any) => {
    const obj = {usuario, tareasDelUsuario: tarea }
    await axios.patch(`${URLrequests}events/assistans/delTarea/${idEvento}`, obj);
    dispatch(getAsistentes(idEvento))
  };


//Agregar alerta para confirmar eliminacion de asistente
export const eliminarAsistente = async ( id: string, idEvento: string, dispatch: any, socket:any) => {
        
        await axios.patch(`${URLrequests}api/users/deleteeventstoassist/${id}/${idEvento}`);
        dispatch(getAsistentes(idEvento))
};

