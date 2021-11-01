import URLrequests from "../../components/constanteURL";
import { getAsistentes } from "../../actions/actions";
import axios from 'axios'
import { INotificaciones } from '../../interfaces/interfaces'


export const agregarTarea = async (
  tarea: string,
  name: string,
  idUser: string,
  idEvento: string,
  eventName: string,
  dispatch: any,
  socket: any
) => {
  await axios.patch(`${URLrequests}api/users/addtask/${idUser}/${idEvento}`, {
    tarea,
  });
  dispatch(getAsistentes(idEvento));

  const data:INotificaciones = {
    uid: idUser,
    type: "task",
    idEvento,
    message: `${name} te ha asignado una nueva tarea: ${tarea} en su evento ${eventName}`,
  };  
  socket.emit("postNotification", data);
};

export const eliminarTarea = async (
  tarea: string,
  eventName: string,
  name: string,
  idUser: string,
  idEvento: string,
  dispatch: any,
  socket: any
) => {
  await axios.patch(
    `${URLrequests}api/users/deleteTask/${idUser}/${idEvento}`,
    { tarea }
  );
  dispatch(getAsistentes(idEvento));

  const data = {
    uid: idUser,
    type: "task",
    idEvento,
    message: `${name} te ha eliminado una tarea asignada: ${tarea} de su evento ${eventName}`,
  };
  socket.emit("postNotification", data);
};

//Agregar alerta para confirmar eliminacion de asistente
export const eliminarAsistente = async (
  idUser: string,
  eventName: string,
  name: string,
  idEvento: string,
  dispatch: any,
  socket: any
) => {
  await axios.patch(
    `${URLrequests}api/users/deleteeventstoassist/${idUser}/${idEvento}`
  );
  dispatch(getAsistentes(idEvento));

  const data = {
    uid: idUser,
    type: "delAsis",
    idEvento,
    message: `${name} te ha quitado de la lista de asistentes al evento ${eventName}`,
  };
  socket.emit("postNotification", data);
};
