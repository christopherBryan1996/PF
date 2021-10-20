import { useParams } from "react-router-dom";
import BarritaEventos from './BarritaEventos'

export default function  Perfil():JSX.Element {
    const {username}:{username:string}=useParams()

    return(
        <div>
        <div>navbar</div>
        <div>{username}</div>
        <div>
            <BarritaEventos/>{/* pasarle el username, el ide del evento y el nombre del evento */}
            <BarritaEventos/>
        </div>
        </div>
    )
}