import { useState } from 'react';
import './styles/Register.css';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";

export default function Register() {

    //Estados---------------------------------------------------------------------------------

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    console.log(username, email, password2, password)
    //Funcion para redirigir la pagina-------------------------------------------------------
    const history = useHistory();
    const ToLogin = () => {
        history.push("/Login")
    };
    
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
    const contraseña2incorrecta = () => toast.error('Las contraseñas no coinciden', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    //Funcion para enviar los posts del form-------------------------------------------------
    const handleSubmit = (e: any) => {
        e.preventDefault();
        //validators------------------------------
        if (!username || !email || !password || !password2) { return alert("Faltan completar casillas!") }
        if (password2 !== password) { return contraseña2incorrecta() }
        const ck_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const ck_password = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (!ck_password.test(password)) {
            return contraseñaIncorrecta()
        };
        if (!ck_email.test(email)) {
            return mailIncorrecto()
        };

        const post = { username, email, password }
        console.log("constPost", post)
        fetch('http://localhost:3001/activity', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post)
        })
    };

    //Return del componente--------------------------------------------------------------------
    return (
        <div className="fondoDiv">

            <div className="container card p-3 card-register ">
                <div>

                    <h2>Registro</h2>
                </div>
                <div>
                    <form className="formRegister form-gorup" onSubmit={handleSubmit}>
                        <div className="form-group col-md-6 ">
                            <label>Nombre de usuario</label>
                            <input
                                className="form-control"
                                placeholder="Escribe tu Nombre de usuario"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}>
                            </input>
                        </div>
                        <div className="form-group col-md-6 ">
                            <label>Email</label>
                            <input
                                className="form-control"
                                placeholder="Escribe tu Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}>
                            </input>
                        </div>
                        <div className="form-group col-md-6 ">
                            <label>Contraseña</label>
                            <input
                                className="form-control"
                                placeholder="Escribe tu contraseña"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} >
                            </input>
                        </div>
                        <div className="form-group col-md-6 ">
                            <label> Repite tu contraseña</label>
                            <input
                                className="form-control"
                                placeholder="Repite tu contraseña"
                                type="password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)} >
                            </input>
                        </div>
                        <div className="form-group col-md-6">
                            <button className="btn btn-primary col-md-12  btn-lg">Crear cuenta</button>
                        </div>

                        <div className="form-group col-md-6">

                            <button className=" col-md-12  btn-lg btn btn-outline-light"> <FcGoogle fontSize="1.8em" /> Con Google</button>

                        </div>
                        <div className="form-group col-md-6">
                            <button className="col-md-12 btn btn-success" onClick={ToLogin}>Ya tienes cuenta? LogIn</button>
                        </div>
                    </form>
                </div>

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