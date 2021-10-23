import URLrequests from "../../components/constanteURL";
import { getUsersEvents } from "../../actions/actions";
import axios from 'axios';

export const deleteEvent = async(uid:string, id: string, dispatch:any) => {

    
    await axios.delete(`${URLrequests}events/delete/${id}`);
    dispatch(getUsersEvents(uid))
    
    }
