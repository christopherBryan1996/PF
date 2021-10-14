import {useState} from "react";
import { useHistory } from "react-router-dom";
import './styles/Login.css';

export default function Login () {

    //Estados------------------------------------------------------------------------
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    //Funciones para Redireccionar pagina--------------------------------------------
    const history = useHistory();
    const back = () => {
        history.push("/")
    };
    const toRegister = () => {
        history.push("/Register")
    };

    //Funcion para enviar los posts del form-----------------------------------------
    const handleSubmit = (e:any) => {
        e.preventDefault();
        if( !email || !password ){return alert("Faltan completar casillas!")}
        

        const post = { email, password}
        console.log("constPost",post)
        fetch('http://localhost:3001/activity', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        })
    };

    
    //Return del componente -------------------------------------------------------------------------------
    return(
        <div className="divpapa">
            <div className="navLogin">
                <button onClick={back}>Back</button>
                <h1>Hola! Bienvenidos</h1>
            </div>
            <div className="botonesLogin">
                <button onClick={toRegister}>No tienes cuenta? Registrate</button>
                <button>Inicia con Google</button>
            </div>
            <div >
                <form className="formLogin" onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input 
                    placeholder="Escribe tu Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    ></input>
                    <label>Contraseña</label>
                    <input 
                    placeholder="Escribe tu contraseña"
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    ></input>
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}