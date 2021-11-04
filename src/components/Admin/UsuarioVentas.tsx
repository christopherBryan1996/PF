

import React from 'react'


interface Iprops {

    usuario: string;
    eventosaAsistir: any[];

}




export const UsuarioVentas = (props: Iprops) => {



    return (
        <>
            {props.eventosaAsistir.map((e: any) => (
                <tr><th>{props.usuario}</th>                    
                    <th>{e.statusPago.status}</th>
                    <th>{e.eventId?.nombreDelEvento }</th>
                    
                </tr>
            ))}

            </>           
       
    )
}
