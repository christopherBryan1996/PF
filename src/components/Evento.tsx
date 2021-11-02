import "./styles/Card.css";
import { Link } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { useSelector, useDispatch } from "react-redux";
import {
  addFavoriteEvent,
  addFavoriteInvitado,
  deleteFavoriteEvent,
  deleteFavoriteInvit,
  
} from "../actions/actions";
import { toast, ToastContainer } from "react-toastify";
import { IoHeartOutline } from "react-icons/io5";

interface Iprops {
  fecha: string;
  imagen: string;
  nombreDelEvento: string;
  _id: string;
  precio: number;
  favoritos: any;
}

export const Evento = (props: Iprops) => {
  const { fecha, imagen, nombreDelEvento, _id, precio, favoritos }: Iprops =
    props;
  const { authGoo, favInvitados } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  let resultado:boolean

  const checkFavorito = () => {
    if (authGoo.logNormal && favoritos.favouritesEvents) {
      resultado = favoritos.favouritesEvents.some(
        (e: any) => e._id === _id
      );
      if (resultado) return "favorites-container2";
    } else if (!authGoo.logNormal && favInvitados.favoritosIds) {
      resultado = favInvitados.favoritosIds.some((e: any) => e === _id);
      if (resultado) return "favorites-container2";
    }
    return "favorites-container";
  };

  const eventoAgregado = () =>
    toast.success("Evento agregado con exito!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const eventoNoAgregado = () =>
    toast.error("Este evento ya se encuentra entre tus favoritos!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const agregarAfavoritos = () => {
        if (authGoo.logNormal) {
            if(resultado){
                dispatch(deleteFavoriteEvent(authGoo.logNormal.uid, _id));
            }
            else{
            dispatch(addFavoriteEvent(authGoo.logNormal.uid, _id));
            // eventoAgregado()
            }
        }
        else {
            if(resultado){
                dispatch(deleteFavoriteInvit(_id));
            }
            else{
            dispatch(addFavoriteInvitado(_id));
            // eventoAgregado();
            }
        }
    }


  return (
    <div className="card container-card">
      <Link to={`/detail/${_id}`}>
        <img
          className="card-img-top"
          src={imagen}
          alt="Card image cap"
          height="160"
        />
      </Link>
      <div className="card-body">
        <p className="card-text fecha">{fecha.slice(0, 10)}</p>
        <Link to={`/detail/${_id}`}>
          <h5 className="card-title">{nombreDelEvento}</h5>
        </Link>

        {precio === 0 ? (
          <p className="card-text">Gratis</p>
        ) : (
          <p className="card-text">Valor: ${precio}</p>
        )}
        <div className="card-footer">
          <span className="spa">Compartir</span>
          <FacebookShareButton
            url={`https://students.soyhenry.com/`}
            quote="Hola, quiero compartir este evento"
          >
            <FacebookIcon className="share" round={true} size="2em" />
          </FacebookShareButton>
          <WhatsappShareButton
            title="Hola, te comparto este evento, te pueda interesar!"
            url={`https://flamboyant-golick-d7cb40.netlify.app/detail/${_id}`}
          >
            <WhatsappIcon className="share" round={true} size="2em" />
          </WhatsappShareButton>
        </div>
        <div className={checkFavorito()}>
          <span>
            <button onClick={agregarAfavoritos}>
              <IoHeartOutline color="white" fontSize="1.6em" />
            </button>
          </span>
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
        pauseOnHover
      />
    </div>
  );
};

// <div className="container-card">
//     <div >
//         <Link to={`/detail/${_id}`} className="link" >
//             <img className="card-img-top" src={imagen} alt="Card image cap" height="180" />
//             <div className="card-body">
//                 <p className="card-text">{fecha.slice(0, 10)}</p>
//                 <h5 className="card-title">{nombreDelEvento}</h5>

//                 {
//                     (precio === 0
//                         ?
//                         <p className="card-text">Gratis</p>
//                         :
//                         <p className="card-text">Valor:  ${precio}</p>
//                     )
//                 }
//             </div>

//         <div className="card-footer">
//             <button className="btn btn-outline-success my-2 my-sm-0" onClick={agregarAfavoritos}> Añadir a Favoritos</button>
//             <span className="spa">Compartir</span>
//             <FacebookShareButton url={`https://students.soyhenry.com/`} quote='Hola, quiero compartir este evento'>
//                 <FacebookIcon className="share" round={true} size='2em' />
//             </FacebookShareButton>
//             <WhatsappShareButton
//                 title='Hola, te comparto este evento, te pueda interesar!'
//                 url="https://students.soyhenry.com/">
//                 <WhatsappIcon className="share" round={true} size='2em' />
//             </WhatsappShareButton>
//         </div>

//     </div>

// </div>
