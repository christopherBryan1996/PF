import { useState } from "react";
import { useHistory } from "react-router-dom";
import './styles/Login.css';
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginNormal, login } from "../actions/actions";
import {startGoogleLogin, nuevoUsuario} from "../controllers/loginGoogle/googleLogin";
import URLrequests from "./constanteURL";
import { getAuth, signInWithPopup } from "firebase/auth";
import { googleAuthProvider } from "../firebase/firebase-config";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'

export default function Login() {

    const dispatch = useDispatch()
    const { authGoo } = useSelector((state: any) => state)

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
    const usuarioRepetido = (text: string) => toast.error(text, {
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

    const cuentaInhabilitada = () => toast.error('Esta cuenta se encuentra temporalmente inhabilitada', {
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

    const toRegister = () => {
        history.push("/Register")
    };
    const toHome = () => {
        history.push("/home")
    };


    //Funcion para enviar los posts del form-----------------------------------------
  const  handleGoogleLogin = async () => {
    const auth = getAuth();
    const { user }: {user: any} = await signInWithPopup(auth, googleAuthProvider)
    const loginGoogle = {
        uid:user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL
    }
    const infoLog = {
        email: user.email, 
        password: user.uid.slice(0,12)
    }
    const data : any = await startGoogleLogin(infoLog) 
    if( data && data.ok){
        dispatch(loginNormal(data)); 
    } else {
        const usuario = {
                usuario: user.displayName,
                email: user.email,
                password: user.uid.slice(0,12)
        }
        const datos: any = await nuevoUsuario(usuario)
        dispatch(loginNormal(datos))           
    }
    if(!data.habilitado) return cuentaInhabilitada()
    await dispatch(login(loginGoogle));
    const {dataGoogle}:{dataGoogle:any} = await axios.get(`${URLrequests}api/payment/getstatus/${data.uid}`)
        toHome() 

        
  }


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

        async function fetchPost(data: object) {
            try {
                const { data }: { data: any } = await axios.post(`${URLrequests}api/auth`, post);
                if (data.ok) {
                    if(!data.habilitado) return cuentaInhabilitada()
                    dispatch(loginNormal(data));             
                    const {data2}:{data2:any} = await axios.get(`${URLrequests}api/payment/getstatus/${data.uid}`)           
                    setTimeout(()=>toHome(),1000);
                } else {
                    usuarioRepetido(data.msg);
                }

            } catch (error) {
                console.error(error);
            }
        }
        fetchPost(post)
    };


    //Return del componente -------------------------------------------------------------------------------
    return (
        <div className="divpapa">


            <div className="contaimer card-login p-3">
                <div className="navLogin">

                    <h1>Hola! Bienvenidos</h1>
                </div>

                <div >
                    <form onSubmit={handleSubmit}>
                        <div className="form-group col-md-12 ">
                            <label>Email</label>
                            <input
                                className="form-control"
                                placeholder="Escribe tu Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}>
                            </input>
                        </div>
                        <div className="form-group col-md-12 ">
                            <label>Contraseña</label>
                            <input
                                className="form-control"
                                placeholder="Escribe tu contraseña"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} >
                            </input>
                        </div>
                        <div className="form-group col-md-12">
                            <button className="btn btn-primary   btn-lg">Iniciar sesion </button>
                        </div>
                    </form>
                    <div className="form-group col-md-12">
                        <button onClick={handleGoogleLogin} className="btn btn-outline-success btn-lg"><FcGoogle /> Iniciar sesion con Google</button>
                    </div>
                    <div className="form-group col-md-8">
                        <button className=" btn btn btn-link" onClick={toRegister}>No tienes cuenta? Registrate</button>
                    </div>
                    <div className="form-group col-md-8">
                        <button className=" btn btn-success" onClick={toHome}>Regresar al home</button>
                    </div>

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