import URLrequests from "../../components/constanteURL";
import { getUsersEvents } from "../../actions/actions";
import axios from 'axios';

export const deleteEvent = async(uid:string, id: string, author: string, nombreDelEvento: string, socket: any, dispatch:any) => {
  
    const { data }: {data : any} = await axios.get(`${URLrequests}events/assistans/${id}`);   
    
    await axios.delete(`${URLrequests}events/delete/${id}`);
    dispatch(getUsersEvents(uid))

        const asistentes: [] = data.asistentes
        console.log(asistentes)

        let post:any = {    
            uid,
            type: "delEvent",
            idEvento: id,
            message: `${author} ha eliminado el evento ${nombreDelEvento}. ¡Encuentra nuevos eventos!`,
        }

        asistentes && asistentes.length && asistentes.forEach(async(asistente: any)=>{
    
        console.log(post)

            post.uid = asistente.usuario[0]._id
            socket?.emit("postNotification", post)

            const { data }: {data : any} = await axios.get(`${URLrequests}api/users/${asistente.usuario[0]._id}`);
            await axios.post(`${URLrequests}api/email/send-email-delete-asis/${data.user.email}/${nombreDelEvento}`);
        })

        
    }
