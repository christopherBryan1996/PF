import react from 'react';
import './styles/Register.css';
import { useHistory } from "react-router-dom";
import fondoRegister from '../images/fondoRegister.jpg';

export default function Register() {

    const history = useHistory();
    const ToLogin = () => {
        history.push("/Login")
    };




    return(
        <div className="fondoDiv">
            <div>
                <h2>Completa las casillas con tu informacion</h2>
            </div>
            <div>
                <form className="formRegister">
                    <label>Email</label>
                    <input placeholder="Escribe tu Email"></input>
                    <label>Contraseña</label>
                    <input placeholder="Escribe tu contraseña" type="password"></input>
                    <label> Repite tu contraseña</label>
                    <input placeholder="Repite tu contraseña" type="password"></input>
                    <button>Register</button>
                </form>
            </div>
            <div className="botonesRegister">
                <button onClick={ToLogin}>Ya tienes cuenta? LogIn</button>
                <h3>Or</h3>
                <button>Inicia con Google</button>
            </div>
        </div>
    )
}