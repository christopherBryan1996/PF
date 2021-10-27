import { BsFillBellFill, BsBell } from "react-icons/bs";
import "./styles/Notificaciones.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cleanNotifications } from "../actions/actions";

export const Notificacion = () => {
  const { authGoo, socketIO }: { authGoo: any; socketIO: any } = useSelector(
    (state: any) => state
  );

  const [response, setResponse] = useState<string[]>(
    socketIO.notificacionesOffL
  );
  const [clicked, setClicked] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(socketIO.notificacionesOffL.length);

  const dispatch = useDispatch();
  //useEffect escuchando socketio
  useEffect(() => {
    socketIO.socket?.on("getNotification", (notificacion: any) => {
      const newTarea: string = notificacion.message;
      setResponse([newTarea, ...response]);
      setCounter(counter + 1);
    });
  });

  const handleClick = (click: boolean) => {
    setClicked(click);
    !click && setCounter(0);
  };

  const eliminarNotif = () => {
    setResponse([]);
    setCounter(0);
    socketIO.notificacionesOffL.length &&
    socketIO.socket.emit("cleanNotifications", authGoo.logNormal.uid);
    dispatch(cleanNotifications());
  };
  return (
    <div className="notificaciones">
      {!clicked ? (
        <button className="buttonNotif">
          <BsFillBellFill
            color="white"
            fontSize="1.6em"
            onClick={() => handleClick(true)}
          />
          {counter === 0 ? null : <div className="contador">{counter}</div>}
        </button>
      ) : (
        <button className="buttonNotif">
          <BsBell
            color="white"
            fontSize="1.6em"
            onClick={() => handleClick(false)}
          />
        </button>
      )}
      {!clicked ? null : (
        <div className={"card-body card notificacion"}>
          {!response.length ? (
            <p>No tienes notificaciones</p>
          ) : (
            <>
              {response.map((notif: string, idx: number) => (
                <div className="card-body " key={idx}>
                  <p>{notif}</p>
                </div>
              ))}
              <button className="card " onClick={eliminarNotif}>
                Eliminar notificaciones
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
