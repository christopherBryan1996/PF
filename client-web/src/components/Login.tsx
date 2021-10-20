import { useState } from "react";
import { useHistory } from "react-router-dom";
import './styles/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

    //Estados-------------------------------------------------------------------------
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //warnings----------------------------------------------------------------------
    const contraseñaIncorrecta = () => toast.error('La contraseña debe tener mas de 6 caracteres y contener 1 numero!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const mailIncorrecto = () => toast.error('Debe ingresar un mail valido', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const usuarioCreado = () => toast.success('El usuario fue creado con exito', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const usuarioRepetido = () => toast.error('El usuario o el Email son incorrectos!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const faltanCasillas = () => toast.error('Faltan completar casillas!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });


    //Funciones para Redireccionar pagina--------------------------------------------
    const history = useHistory();
    const back = () => {
        history.goBack()
    };
    const toRegister = () => {
        history.push("/Register")
    };
    const toHome = () => {
        history.push("/home")
    };

    //Funcion para enviar los posts del form-----------------------------------------
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!email || !password) { return faltanCasillas() }
        const ck_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const ck_password = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        if (!ck_password.test(password)) {
            return contraseñaIncorrecta()
        };
        if (!ck_email.test(email)) {
            return mailIncorrecto()
        };

        const post = { email, password }
        console.log("constPost", post)

        async function fetchPost(data: object) {
            try {
                const mensaje = await fetch('https://api-fest.herokuapp.com/api/auth', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json;charset=UTF-8" },
                    body: JSON.stringify(data)
                });
                if (mensaje.ok) {
                    toHome();
                } else {
                    usuarioRepetido();
                }
                console.log("mensajefetch", mensaje);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPost(post)
    };


    //Return del componente -------------------------------------------------------------------------------
    return (
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
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <label>Contraseña</label>
                    <input
                        placeholder="Escribe tu contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <button>Login</button>
                </form>
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
                pauseOnHover />
        </div>
    )
}