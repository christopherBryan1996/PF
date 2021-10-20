import { useParams } from "react-router-dom";
import BarritaEventos from './BarritaEventos'

export default function  Perfil():JSX.Element {
    const {username}:{username:string}=useParams()

    return(
        <div>
        <div>navbar</div>
        <div>{username}</div>
        <div>
            <BarritaEventos/>
            <BarritaEventos/>
        </div>
        </div>
    )
}