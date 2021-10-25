import './styles/Card.css'
import { Link } from "react-router-dom";
import imag from '../images/bolos.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { addFavoriteEvent } from "../actions/actions"
import { toast, ToastContainer } from 'react-toastify';


interface Iprops { fecha: string, imagen: string, nombreDelEvento: string, _id: string }


export const Evento = (props: Iprops) => {


    const { fecha, imagen, nombreDelEvento, _id }: Iprops = props
    const { authGoo } = useSelector((state: any) => state);
    const dispatch = useDispatch();
    
    const eventoAgregado = () => toast.success('Evento agregado con exito!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const agregarAfavoritos = () => {
        authGoo.logNormal &&
        dispatch(addFavoriteEvent(authGoo.logNormal.uid, _id));
        eventoAgregado();
    };

    

    return (
        <>

            <div className="container-card">
                <div >
                    <Link to={`/detail/${_id}`} className="link" >
                        <img className="card-img-top" src={imagen} alt="Card image cap" height="240" />
                        <div className="card-body">
                            <p className="card-text">{fecha.slice(0, 10)}</p>
                            <h5 className="card-title">{nombreDelEvento}</h5>
                        </div>
                    </Link>
                    <div className="card-footer">
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={agregarAfavoritos}> Añadir a Favoritos</button>

                    </div>

                </div>
                <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
            </div>

        </>
    )
}