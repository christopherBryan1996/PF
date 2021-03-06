import { BsFillBellFill, BsBell } from "react-icons/bs";
import "./styles/Notificaciones.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotifOffLine, saveNotifications, resetNotifications } from "../actions/actions";


export const Notificacion = () => {

  const { authGoo, socketIO }: { authGoo: any; socketIO: any } = useSelector(
    (state: any) => state
  );

  const { OffLinenotif, notifLeidas }: { OffLinenotif: any[], notifLeidas: any } = useSelector(
    (state: any) => state.notificaciones
  );
  const dispatch = useDispatch();

  const [notificaciones, setNotificaciones] = useState<any[]>([])
  const [clicked, setClicked] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    authGoo.logNormal &&
     dispatch(getNotifOffLine(authGoo.logNormal.uid))
  }, []);

  useEffect(() => {
    OffLinenotif.length && setNotificaciones(OffLinenotif.reverse())
    setCounter(OffLinenotif.length)
  }, [OffLinenotif]);

  useEffect(() => {
   
     socketIO.socket?.on("getNotifications", ( uid: string, type:string, idEvento:string, message:string) =>{
    
      const newNot = {
       uid, 
       type,
       idEvento,
       message
     }
     
     let lista = notificaciones
     if(notificaciones[0] !== newNot) lista.unshift(newNot)
     setNotificaciones(lista); 
     setCounter(notificaciones.length);
     })         
  }, [socketIO])

  const handleClickTrue  = () => {
    notificaciones.length && dispatch(saveNotifications(notificaciones))
    setCounter(0);  
    const emptyArr: [] = []
    setNotificaciones(emptyArr);
    socketIO.socket?.emit("cleanNotifications", authGoo.logNormal.uid);     
    setClicked(true);  
  };

  const handleClickFalse = () => {
    setClicked(false);
  };

  const eliminarNotif = () => {
    setNotificaciones([]);
    setCounter(0);
    socketIO.socket?.emit("cleanNotifications", authGoo.logNormal.uid);
    dispatch(resetNotifications());
  };

  const nofifType = (type: string, idEv: string, uid: string) => {
    switch (type) {
      case "task":
        return `/misEventos/${uid}`;
      case "delAsis":
        return `/detail/${idEv}`;
      case "delEvent":
        return `/home`;
      case "newAsis":
        return `/asistentes/${uid}/${idEv}`;
      default:
        break;
    }
  }

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
          {counter === 0 ? null : <div className="contador"></div>}          
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
          <div className="card-body card-container-noti">
            {(!notificaciones.length && !notifLeidas.length) ? (
              <p>No tienes notificaciones</p>
            ) : (
              <>
                <button className="card-body deleteNot" onClick={eliminarNotif}>
                  Eliminar notificaciones
                </button>
                {!notificaciones.length ? null : notificaciones.map((notif: any, idx: number) => (
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
