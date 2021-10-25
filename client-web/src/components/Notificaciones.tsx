import { BsFillBellFill, BsBell } from "react-icons/bs";
import "./styles/Notificaciones.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";



export const Notificacion = (socket:any) => {

    const { authGoo, socketIO } = useSelector((state: any) => state);
   
    const [ response, setResponse ] = useState([""])
    const [ clicked, setClicked] = useState(false);
    const [ counter, setCounter] = useState(0);
    const [notificacion, setNotificacion] = useState(false);

    //useEffect escuchando socketio
    useEffect(()=>{
      socketIO.socket?.on("getNotification", (notificacion: any) =>{
        const newTarea: string = notificacion.message
        setResponse([...response, newTarea])
        setCounter(response.length)
      })
    })

    const handleClick = (click:boolean) =>{
        setClicked(click);
        setNotificacion(click)
        setCounter(0);
        
  }
    return (
    <div className="notificaciones">    
      {!clicked ? 
      <button className="buttonNotif">
            <BsFillBellFill color="white" fontSize="1.6em" onClick={() => handleClick(true)} />
            {counter === 0 ? null: <div className="contador">{counter}</div>}
      </button> :      
       <button className="buttonNotif">
      <BsBell color="white" fontSize="1.6em" onClick={() => handleClick(false)} />
      </button>}
      {!notificacion ? null : (
            <div className={"card-body card notificacion"}>
              {counter===0 ? 
              <p>No tienes notificaciones</p>:
              response.map((not: string, idx: number) => (
                <div className="card-body " key={idx}>
                  <hr />
                  <p>{not}</p>                  
                </div>
              ))}             
            </div>
          )}
      
    </div>
  );
};
