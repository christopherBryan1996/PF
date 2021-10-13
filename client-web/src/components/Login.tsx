import React from "react";
import { useHistory } from "react-router-dom";
import './styles/Login.css';

export default function Login () {

    const history = useHistory();
    const back = () => {
        history.push("/")
    };


    return(
        <div className="divpapa">
            <div className="navLogin">
                <button onClick={back}>Back</button>
                <h1>Hola! Bienvenidos</h1>
            </div>
            <div className="botonesLogin">
                <button>No tienes cuenta? Registrate</button>
                <button>Inicia con Google</button>
            </div>
            <div >
                <form className="formLogin">
                    <label>Email</label>
                    <input placeholder="Escribe tu Email"></input>
                    <label>Contraseña</label>
                    <input placeholder="Escribe tu contraseña" type="password"></input>
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}