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
        const ck_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  ;
        const ck_password =/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/ ;

        if (!ck_password.test(password)){
            return alert("Debes ingresar una contraseña de mas de 6 caracteres y al menos 1 numero.")
        };
        if(!ck_email.test(email)){
            return alert("Debes ingresar un mail valido")
        };

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