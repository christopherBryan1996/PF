import URLrequests from "../../components/constanteURL";
import { getEventosAsistir } from "../../actions/actions";
import axios from 'axios';


//, author: string, nombreDelEvento: string, socket: any, dispatch:any
export const borrarAsistencia = async(uid:string, eventId:any, dispatch:any) => {
    console.log(eventId._id, "eventiffd")
    
    await axios.patch(`${URLrequests}api/users/deleteeventstoassist/${uid}/${eventId._id}`);
    dispatch(getEventosAsistir(uid))
    
    // const { data }: {data : any} = await axios.get(`${URLrequests}events/assistans/${id}`);   
   
    //     const asistentes: [] = data.asistentes
    //     let post:any = {    
    //         uid,
    //         type: "delEvent",
    //         idEvento: id,
    //         message: `${author} ha eliminado el evento ${nombreDelEvento}. ¡Encuentra nuevos eventos!`,
    //     }

    //     asistentes.forEach((asistente: any)=>{
    //         post.uid = asistente.usuario[0]._id
    //         socket.emit("postNotification", post)
    //     })

    }
