import "./styles/Nav.css";
import { useEffect, useState } from "react";
import { ImHeart } from "react-icons/im";
import { ImExit } from "react-icons/im";
import logo from "../images/Logo.png";
import avatar from "../images/user.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../actions/actions";
import { Notificacion } from "./Notificaciones";
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";

export const Nav = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const { authGoo } = useSelector((state: any) => state);
  const [logins, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
 
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        const datos = {
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL
        }
        dispatch(login( datos ));
        setIsLoggedIn(true);
      } else if (authGoo.logNormal && authGoo.logNormal.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [dispatch]);

  const handleLogout = async() => {
    const auth = getAuth();
    await signOut(auth);
    dispatch(logout());
    landing()
  };

  const history = useHistory();
  const botonIngresa = () => {
    history.push("/login");
  };
  const home = () => {
    history.push("/home");
  };

  const favorites = () => {
    history.push(`/home/${authGoo.logNormal.uid}/favorites`);
  };
  const botonRegistrate = () => {
    history.push("/register");
  };
  const landing = () => {
    history.push("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand">
          <img onClick={home} src={logo} alt="" width="240" height="65" />
        </a>
       

        {logins ? (
          <div className="fff">
            <a onClick={favorites}>
              {" "}
              <ImHeart color="white" fontSize="1.6em" />
             <Notificacion />
            </a>
            <a href= {`/home/usuario/${authGoo.logNormal.uid}`} >
              <img src={avatar} alt="" width="50" height="50" />
            </a>
            <a onClick={handleLogout}>
              <ImExit fontSize="1.3em" />
            </a>
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
