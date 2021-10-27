
import URLrequests from "../../components/constanteURL";
import axios from "axios";

export const startGoogleLogin = async(infoLog: any) => {
    
    try {        
        const {data}: {data:any} = await axios.post(`${URLrequests}api/auth`, infoLog);
        return data;       
     } catch (error) {
         console.error(error)
     }      
};


export const nuevoUsuario = async(datosLog: any) => {
    
    try {
        const { data } = await axios.post(`${URLrequests}api/auth/new`,datosLog);
        return data;       
     } catch (error) {
         console.error(error)
     }      
};

