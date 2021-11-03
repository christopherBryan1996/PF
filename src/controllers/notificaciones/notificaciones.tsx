import URLrequests from "../../components/constanteURL";
import axios from "axios";

export const notificacionModifEvento = async (
    socket: any,
    eventid: string,
    name: string,
    nameEvent: string

) => {

    const { data }: {data : any} = await axios.get(`${URLrequests}events/assistans/${eventid}`);   
   
        const asistentes: [] = data.asistentes

        let post:any = {    
            uid: '',
            type: "delAsis",
            idEvento: eventid,
            message: `${name} ha modificado el evento ${nameEvent}. ¡Revisa los cambios!`,
        }

        asistentes && asistentes.length && asistentes.forEach(async(asistente: any)=>{
    
            post.uid = asistente.usuario[0]._id
            socket?.emit("postNotification", post)

            const { data }: {data : any} = await axios.get(`${URLrequests}api/users/${asistente.usuario[0]._id}`);
            //NOTIFICACION PARA MAIL EVENTO MODIFICADO
        })
}

