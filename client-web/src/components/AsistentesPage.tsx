import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import  Asistente from './Asistente';

//Necesito un get que devuelva la lista de asistentes por ID

https://api-fest.herokuapp.com/events/:id/assistans

//hardcode para probar asistentes
interface Iasistentes {
    usernameDelAsistente: string;
    tareasdelAsistente: string[];
}

const asistente1:Iasistentes = {
    usernameDelAsistente: 'Mario',
    tareasdelAsistente: ['Traer bebida', 'Reservar salon']
}



//-------------------

export default function AsistentesPage() {

    const { username, eventid }: {username: string, eventid: string} = useParams();
    const dispatch = useDispatch();
    getAsistentes()
  
    
    // useEffect(() =>
    // {loadPage()
    // dispatch(getDetail(id))},  []);
  
    return(
        <div>
          <Asistente 
          usernameDelAsistente={asistente1.usernameDelAsistente}
          tareasdelAsistente={asistente1.tareasdelAsistente}
          />           
        </div>
    )
}