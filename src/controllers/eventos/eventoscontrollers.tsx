import URLrequests from "../../components/constanteURL";
import { getUsers, getUsersEvents } from "../../actions/actions";
import axios from 'axios';

export const deleteEvent = async(uid:string, id: string, author: string, nombreDelEvento: string, socket: any, dispatch:any) => {

    
    const { data }: {data : any} = await axios.get(`${URLrequests}events/assistans/${id}`);   
    const asistentes: [] = data.asistentes
    await axios.post(`${URLrequests}events/delete/${id}`,{asistentes});
    dispatch(getUsersEvents(uid))
    
    console.log("id", id)
   
        console.log("asistentes", asistentes)
        let post:any = {    
            uid,
            type: "delEvent",
            idEvento: id,
            message: `${author} ha eliminado el evento ${nombreDelEvento}. ¡Encuentra nuevos eventos!`,
        }

        asistentes && asistentes.length && asistentes.forEach(async(asistente: any)=>{
        
            post.uid = asistente.usuario[0]._id
            socket.emit("postNotification", post)
            const { data }: {data : any} = await axios.get(`${URLrequests}api/users/${asistente.usuario[0]._id}`);
            await axios.post(`${URLrequests}api/email/send-email-delete-asis/${data.user.email}/${nombreDelEvento}`);
        })

    };

    export const EditEvent = async (id:any, author:any, uid:any, nombreDelEvento:any, socket: any ) => {

        const { data }: {data : any} = await axios.get(`${URLrequests}events/assistans/${id}`);
        const asistentes: [] = data.asistentes
        let post:any = {    
            uid,
            type: "delEvent",
            idEvento: id,
            message: `${author} ha editado el evento ${nombreDelEvento}. ¡Hecha un vistazo a los cambios!`,
        }
        const nomb = nombreDelEvento;
        

        asistentes.length && asistentes.forEach(async (asistente:any)=>{
            post.uid = asistente.usuario[0]._id;
            socket.emit("postNotification", post);
            const { data }: {data : any} = await axios.get(`${URLrequests}api/users/${asistente.usuario[0]._id}`);
            console.log("DataDeEditar" , data)
            
            await axios.post(`${URLrequests}api/email/send-email-edit-asis/${data.user.email}/${nombreDelEvento.toString()}`);

        })
    }


    export const deleteEventAdm = async (id: string) => {

        await axios.delete(`${URLrequests}events/delete/${id}`); 
       
    
    }
    
    
