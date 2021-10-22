import "./styles/Nav.css";
import { useEffect, useState } from "react";
import { ImHeart } from "react-icons/im";
import { ImExit } from "react-icons/im";
import logo from "../images/Logo.png";
import avatar from "../images/user.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, startLogout } from "../actions/actions";

import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Nav = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  const { authGoo } = useSelector((state: any) => state);

  const [logins, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName, user.photoURL));
        setIsLoggedIn(true);
      } else if (authGoo.state && authGoo.state.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(startLogout());
    landing()
  };

  const history = useHistory();
  const botonIngresa = () => {
    history.push("/login");
  };
  const home = () => {
    history.push("/home");
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
          <img onClick={home} src={logo} alt="" width="240" height="70" />
        </a>
        <form className="navbar-center">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar evento..."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </form>

        {logins ? (
          <div className="fff">
            <a href="">
              {" "}
              <ImHeart color="white" fontSize="1.6em" />
            </a>
            <a href="">
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
