import { BsFillBellFill, BsBell } from "react-icons/bs";
import "./styles/Notificaciones.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotifOffLine, saveNotifications, resetNotifications } from "../actions/actions";
import { INotifRecibidas, INotificaciones } from "../interfaces/interfaces";


export const Notificacion = () => {
  
  const { authGoo, socketIO }: { authGoo: any; socketIO: any } = useSelector(
    (state: any) => state
  );

  const { OffLinenotif, notifLeidas } : {OffLinenotif: any[], notifLeidas: any} = useSelector(
    (state: any ) => state.notificaciones 
  );
  const dispatch = useDispatch();

  const [notificaciones, setNotificaciones] = useState<any[]>([])  
  const [clicked, setClicked] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
   dispatch(getNotifOffLine(authGoo.logNormal.uid))
   OffLinenotif.length && setNotificaciones(OffLinenotif.reverse())
    setCounter(OffLinenotif.length) 
  }, []);
 
 
  const notificac = () => {
    console.log("notif funcion")
    socketIO.socket.on("hola", (info: any) => {
      console.log("socketHolaOn", info)
    })
    socketIO.socket.on("getNotifications", ( uid: string, type:string, idEvento:string, message:string) =>{
      console.log("postNotif") 
      const newNot = {
       uid, 
       type,
       idEvento,
       message
     }
     let lista = notificaciones
     lista.unshift(newNot)
     console.log("Listaaa", lista)
     setNotificaciones(lista); 
     setCounter(lista.length);
     }) 
  }

  notificac()

  const handleClickTrue  = () => {
    setClicked(true);  
    setCounter(0);   
    socketIO.socket?.emit("cleanNotifications", authGoo.logNormal.uid);     
  };
  
  const handleClickFalse  = () => {
    setClicked(false);    
    notificaciones.length && dispatch(saveNotifications(notificaciones));    
    setCounter(0);  
    setNotificaciones([]);
  };

  const eliminarNotif = () => {
    setNotificaciones([]);
    setCounter(0);
    socketIO.socket.emit("cleanNotifications", authGoo.logNormal.uid);
    dispatch(resetNotifications());
  };

  const nofifType = (type: string, idEv: string, uid:string) => {
    switch (type) {
      case "task":
        return `/detail/${idEv}`;
      case "delAsis":
        return `/detail/${idEv}`;
      case "delEvent":
      return `/home`;
      case "newAsis":
      return `/asistentes/${uid}/${idEv}`;
      default:
        break;
    }
  };

  return (
    <>
    <div className="notificaciones">
      {!clicked ? (
        <button className="buttonNotif">
          <BsFillBellFill
            color="white"
            fontSize="1.6em"
            onClick={() => handleClickTrue()}
          />
          {counter === 0 ? null : <div className="contador">{counter}</div>}
        </button>
      ) : (
          <button className="buttonNotif">
            <BsBell
              color="white"
              fontSize="1.6em"
              onClick={handleClickFalse}
            />
          </button>)}
    </div>
    <div className="notificacion">
      {!clicked ? null : (
      <div className={"card-body card "}>
        {(!notificaciones.length && !notifLeidas.length )? (
          <p>No tienes notificaciones</p>
        ) : (
          <>
          <button className="card-body deleteNot"  onClick={eliminarNotif}>
              Eliminar notificaciones
            </button>
            {!notificaciones.length ? null:  notificaciones.map((notif: any, idx: number) => (
              <div className="card-body " key={idx}>
                <a
                  className="linkNotif"
                  href={nofifType(notif.type, notif.idEvento, notif.uid)}
                >
                  <p className="notifText">{notif.message}</p>
                </a>
              </div>
            ))}
            {!notifLeidas.length ? null : notifLeidas.map((notif: any, idx: number) => (
              <div className="card-body " key={idx}>
                <a
                  className="linkNotif"
                  href={nofifType(notif.type, notif.idEvento, notif.uid)}
                >
                  <p className="notifText">{notif.message}</p>
                </a>
              </div>
            ))}
          </>
        )}
      </div>)}
      </div>
      </>
  );
};
