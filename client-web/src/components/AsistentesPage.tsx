import  Asistente from './Asistente';

//Necesito un get que devuelva la lista de asistentes por ID

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
    return(
        <div>
          <Asistente 
          usernameDelAsistente={asistente1.usernameDelAsistente}
          tareasdelAsistente={asistente1.tareasdelAsistente}
          />           
        </div>
    )
}