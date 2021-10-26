import './styles/Card.css'
import { ShareDialog } from 'react-native-fbsdk';
import { Link } from "react-router-dom";

import {useSelector, useDispatch } from 'react-redux';
import { addFavoriteEvent} from "../actions/actions"


interface  Iprops {fecha:string,imagen:string,nombreDelEvento:string, _id:string}


export const Evento = (props:Iprops) => {

    const shareLinkContent = {
        contentType: 'link',
        contentUrl: "",
        contentDescription: 'Wow, check out this great site!',
      };


    const {fecha,imagen,nombreDelEvento,_id}:Iprops =props 
    const {uid}=useSelector((state:any)=>state.authGoo.logNormal);
    const dispatch = useDispatch();

    const agregarAfavoritos = () => {
        dispatch(addFavoriteEvent( uid ,_id))
    };
   


    
    return (
        <>
            
            <div className="container-card">
                <div >
                <Link to={`/home/${_id}`} className="link" >
                    <img className="card-img-top" src={imagen} alt="Card image cap"  height="240" />
                    <div className="card-body">
                        <p className="card-text">{fecha.slice(0,10)}</p>
                        <h5 className="card-title">{nombreDelEvento}</h5>
                    </div>
                    </Link>
                    <div className="card-footer">
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={agregarAfavoritos}> Añadir a Favoritos</button>
                        
                    </div>
                    
                </div>
            </div>
            
        </>
    )
}