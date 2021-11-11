

import React from 'react'
import { useHistory } from 'react-router';


interface Iprops {

    usuario: string;
    eventosaAsistir: any[];

}




export const UsuarioVentas = (props: Iprops) => {

    const history = useHistory();
    const toEvent = (eventid: string) => {
        history.push(`/detail/${eventid}`)
    };

    return (
        <>
            {props.eventosaAsistir.map((e: any) => (
                
                <tr>
                    
                    {(e.eventId ?
                        <><th>{props.usuario}</th>
                        <th>{e.eventId?.nombreDelEvento}</th>
                        <th>{e.statusPago.status}</th>
                        <th><button className="btn btn-success" onClick={() => toEvent(e.eventId._id)}>detalle evento</button></th></> : null )  }
                    
        
                </tr>
            ))}

            </>           

    )
}
