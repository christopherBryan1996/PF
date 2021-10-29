import React, { useState } from "react"
import { IeventosAsistir } from "../interfaces/interfaces";


export default function TarjetaEventosAsistir({eventId,tareas}:IeventosAsistir) {
    
    const [tareasVisibles, setTareasVisibles] = useState(false);
    console.log(eventId,"eventid")
    console.log(tareas,"eid")
    
    const desplegarTareas = (): void => {
        setTareasVisibles(!tareasVisibles);
    };

    const fechacoratada = eventId.fecha.slice(0,10)
    // const fechahoy = new Date()
    // console.log(fechahoy,"feh")
    // console.log(fechacoratada,"feh")

    // let dif = mome     
    

    // console.log(dif)

    return(
        <div>
            <div className="barra">
                {eventId.nombreDelEvento}
                <br/>
                {fechacoratada}


            <button  onClick={desplegarTareas} type="button" className="btn btn-outline-success" >
                tareas
            </button>

            {!tareasVisibles ? null : ( 
                <div>
                {tareas.length? tareas.map((i:any)=>(
                        <p>-{i}</p>
                    )):null}  
                </div>
            )}

            </div>
        </div>
    )

//
}