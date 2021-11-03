import "./styles/Nav.css";
import { useEffect, useState } from "react";
import { ImHeart } from "react-icons/im";
import logo from "../images/Logo.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../actions/actions";
import { Notificacion } from "./Notificaciones";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export const Nav = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  const { authGoo, socketIO } = useSelector((state: any) => state);
  const [logins, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        const datos = {
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL
        }
        dispatch(login(datos));
        setIsLoggedIn(true);
      } else if (authGoo.logNormal && authGoo.logNormal.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [dispatch]);

  const history = useHistory();
  const botonIngresa = () => {
    history.push("/login");
  };
  const home = () => {
    history.push("/home");
  };

  const favorites = () => {
    authGoo.logNormal ?
      history.push(`/home/${authGoo.logNormal.uid}/favorites`)
      : history.push(`/home/favorites`)
  };
  const botonRegistrate = () => {
    history.push("/register");
  };
  const landing = () => {
    history.push("/");
  };

  const handleLogout = async () => {

    const auth = getAuth();
    landing()
    dispatch(logout(socketIO.socket));
    await signOut(auth);

    window.location.replace('');

  };

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand">
          <img onClick={home} src={logo} alt="" width="180" height="45" />
        </a>


      
       

          <div className="fav">
            <a onClick={favorites}>
              {" "}
              <ImHeart color="white" fontSize="1.6em" />
            </a>
          </div>
          {logins ? (
            <div className="fff ">
              <Notificacion />


              <li className=" dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={authGoo.logNormal && authGoo.logNormal.image} alt="Avatar" width="40" height="40" />
                  <span>{authGoo.logNormal && authGoo.logNormal.name}</span>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="link-perfil" href={authGoo.logNormal && `/home/usuario/${authGoo.logNormal.uid}`}>Ver perfil</a></li>

                  <li><a className='btn-cerar' onClick={handleLogout}> Cerrar sesion</a></li>
                </ul>
              </li>
            </div>
          ) : (
            <div>
              <button onClick={botonIngresa} className="btn btn-outline-success">
                Ingresar{" "}
              </button>
              <button
                onClick={botonRegistrate}
                className="btn btn-outline-success"
              >
                Registarme{" "}
              </button>
            </div>
          )}
        </div>
    
    </nav>
  );
};
