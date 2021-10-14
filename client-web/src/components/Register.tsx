import {useState} from 'react';
import './styles/Register.css';
import { useHistory } from "react-router-dom";


export default function Register() {

    //Estados---------------------------------------------------------------------------------

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    //Funcion para redirigir la pagina-------------------------------------------------------
    const history = useHistory();
    const ToLogin = () => {
        history.push("/Login")
    };

    //Funcion para enviar los posts del form-------------------------------------------------
    const handleSubmit = (e:any) => {
        e.preventDefault();
        if(!username || !email || !password || !password2){return alert("Faltan completar casillas!")}
        if (password2 !== password){return alert("Las contraseñas no coinciden")}

        const post = {username, email, password}
        console.log("constPost",post)
        fetch('http://localhost:3001/activity', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        })
    };


    //Return del componente--------------------------------------------------------------------
    return(
        <div className="fondoDiv"> 
            <div>
                <h2>Completa las casillas con tu informacion</h2>
            </div>
            <div>
                <form className="formRegister" onSubmit={handleSubmit}>
                    <label>Nombre de usuario</label>
                    <input 
                    placeholder="Escribe tu Nombre de usuario"
                    type="text"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}></input>
                    <label>Email</label>
                    <input 
                    placeholder="Escribe tu Email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}></input>
                    <label>Contraseña</label>
                    <input 
                    placeholder="Escribe tu contraseña"
                    type="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)} ></input>
                    <label> Repite tu contraseña</label>
                    <input 
                    placeholder="Repite tu contraseña" 
                    type="password" 
                    value={password2}
                    onChange={(e)=>setPassword2(e.target.value)} ></input>
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