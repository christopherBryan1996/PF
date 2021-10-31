import URLrequests from "../../components/constanteURL";
import { getEventosAsistir } from "../../actions/actions";
import axios from 'axios';


//, author: string, nombreDelEvento: string, socket: any, dispatch:any
export const borrarAsistencia = async(uid:string, asistente:string, socket:any,  eventId:any, dispatch:any, nombreDelEvento:string ) => {
    console.log(eventId._id, "eventiffd")
    
    await axios.patch(`${URLrequests}api/users/deleteeventstoassist/${uid}/${eventId._id}`);
    dispatch(getEventosAsistir(uid))
    
    const { data }: {data : any} = await axios.get(`${URLrequests}events/${eventId}`);   
   
        const autor: string = data.autor
        let post:any = {    
            uid:autor,
            type: "newAsis",
            idEvento: eventId,
            message: `${asistente} no asistira al evento ${nombreDelEvento}.`,
        }

  
        socket.emit("postNotification", post)
 

    }
