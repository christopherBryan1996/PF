import "./styles/Nav.css";
import { ImHeart } from "react-icons/im";
import logo from '../images/Logo.png';
import avatar from '../images/user.png'
import { useHistory } from "react-router-dom";

export const Nav = () => {

    const history = useHistory();
    const botonIngresa = () => {
        history.push("/login")
    };
    const botonRegistrate = () => {
        history.push("/register")
    };


    return (

        <nav className="navbar navbar-dark bg-dark fixed-top">
            <div className="container">
                <a className="navbar-brand" href="#"><img src={logo} alt="" width="180" height="60" /></a>
                <form className="navbar-center">
                    <input type="text" className="form-control" placeholder="Buscar evento..." aria-label="Username" aria-describedby="basic-addon1" />
                </form>
                    <button onClick={botonIngresa} className="btn btn-outline-success">Ingresar </button>
                    <button onClick={botonRegistrate} className="btn btn-outline-success">Registarme </button>
                <div className="fff">
                <a href=""> <ImHeart color="white" fontSize="1.8em"/></a>
                <a href=""><img src={avatar} alt="" width="50" height="50" /></a>
                </div>
            </div>
        </nav>

    )
}
