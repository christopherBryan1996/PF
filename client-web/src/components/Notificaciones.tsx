import { BsFillBellFill, BsBell } from "react-icons/bs";
import "./styles/Notificaciones.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";



export const Notificacion = (socket:any) => {

    const { authGoo, socketIO } = useSelector((state: any) => state);
   
    const [response, setResponse] = useState(null);    
    const [ clicked, setClicked] = useState(false);
    const [ counter, setCounter] = useState(0);

    //useEffect escuchando socketio
    useEffect(()=>{
      socketIO.socket?.on("getNotification", (notificacion: any) =>{
        console.log(notificacion)
      })
    })

    const handleClick = (click:boolean) =>{
        setClicked(click);
        setCounter(0);
        
  }
    return (
    <div className="notificaciones">    
      {!clicked ? 
      <button className="buttonNotif">
            <BsFillBellFill color="white" fontSize="1.6em" onClick={() => handleClick(true)} />
            <div className="contador">{counter}</div>
      </button> :
       <button className="buttonNotif">
      <BsBell color="white" fontSize="1.6em" onClick={() => handleClick(false)} />
      </button>}
      
    </div>
  );
};
