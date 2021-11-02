import URLrequests from "../../components/constanteURL";
import { getUsersEvents } from "../../actions/actions";
import axios from 'axios';

export const deleteEvent = async(uid:string, id: string, author: string, nombreDelEvento: string, socket: any, dispatch:any) => {

    
    await axios.delete(`${URLrequests}events/delete/${id}`);
    dispatch(getUsersEvents(uid))
    
    console.log("id", id)
    const { data }: {data : any} = await axios.get(`${URLrequests}events/assistans/${id}`);   
   
        const asistentes: [] = data.asistentes
        console.log("asistentes", asistentes)
        let post:any = {    
            uid,
            type: "delEvent",
            idEvento: id,
            message: `${author} ha eliminado el evento ${nombreDelEvento}. ¡Encuentra nuevos eventos!`,
        }

        asistentes.length && asistentes.forEach(async (asistente: any)=>{
            post.uid = asistente.usuario[0]._id
            socket.emit("postNotification", post)
            const { data }: {data : any} = await axios.get(`${URLrequests}api/users/${asistente.usuario[0]._id}`);
            await axios.post(`${URLrequests}api/email/send-email-delete-asis/${data.user.email}/${nombreDelEvento}`);
        })

    }

    export const EditEvent = async (id:any, author:any, uid:any, nombreDelEvento:any ) => {

        const { data }: {data : any} = await axios.get(`${URLrequests}events/assistans/${id}`);
        const asistentes: [] = data.asistentes
        // let post:any = {    
        //     uid,
        //     type: "delEvent",
        //     idEvento: id,
        //     message: `${author} ha editado el evento ${nombreDelEvento}. ¡Hecha un vistazo a los cambios!`,
        // }

        asistentes.length && asistentes.forEach(async (asistente:any)=>{
            // post.uid = asistente.usuario[0]._id;
            // socket.emit("postNotification", post);
            const { data }: {data : any} = await axios.get(`${URLrequests}api/users/${asistente.usuario[0]._id}`);
            await axios.post(`${URLrequests}api/email/send-email-edit-asis/${data.user.email}/${nombreDelEvento}`);

        })


    }
