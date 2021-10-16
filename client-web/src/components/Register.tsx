import {useState} from 'react';
import './styles/Register.css';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const back = () => {
        history.goBack() 
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
        const usuarioRepetido = () => toast.error('El usuario o el Email ya se encuentran registrados!', {
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

    //Funcion para enviar los posts del form-------------------------------------------------
    const handleSubmit = (e:any) => {
        e.preventDefault();
        //validators------------------------------
        if(!username || !email || !password || !password2){return alert("Faltan completar casillas!")}
        if (password2 !== password){return contraseña2incorrecta()}
        const ck_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  ;
        const ck_password =/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/ ;
        if (!ck_password.test(password)){
            return contraseñaIncorrecta()
        };
        if(!ck_email.test(email)){
            return mailIncorrecto()
        };

        const post = {
             usuario: username,
             email, 
             password};

        async function fetchPost(data:object) {
            try {
                const mensaje = await fetch('https://api-fest.herokuapp.com/api/auth/new', {
                    method: 'POST', 
                    headers: {"Content-Type": "application/json;charset=UTF-8"},
                    body: JSON.stringify(data)
                });
                if (mensaje.ok){
                    usuarioCreado();
                }else{
                    usuarioRepetido();
                }
                console.log("mensajefetch", mensaje);
            } catch (error) {
                console.error(error);
            }             
        }    
        fetchPost(post)   
    };


    //Return del componente--------------------------------------------------------------------
    return(
        <div className="fondoDiv"> 
            <div>
                <button onClick={back}>Back</button>
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
                    <button >Register</button>
                </form>
            </div>
            <div className="botonesRegister">
                <button onClick={ToLogin}>Ya tienes cuenta? LogIn</button>
                <h3>Or</h3>
                <button>Inicia con Google</button>
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
            pauseOnHover/>
        </div>
    )
}