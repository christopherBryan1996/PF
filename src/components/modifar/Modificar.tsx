import { useParams } from 'react-router'
import axios from 'axios'
import URLrequests from "../constanteURL";
import './css/style.css'
import './css/sourcesanspro-font.css'
import image from './images/form-v8.jpg'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { loginNormal } from '../../actions/actions'
import { useDispatch, useSelector } from "react-redux";
import { Nav } from '../Nav'
import { fileUpload } from "../../helpers/fileUpload";

export const ModificarUser = () => {
    //traemos lo que este en id del params
    const { id } = useParams() as any
    const { authGoo } = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [state, setstate] = useState({
        name: '',
        password: '',
        comfirm_password: '',
    })

    const [img, setimg] = useState(null || "");

    useEffect(() => {
        authGoo.logNormal && setimg(authGoo.logNormal.image)
    }, [authGoo])


    //mensajes
    const contraseña2incorrecta = () => toast.error('Las contraseñas no coinciden', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const exitoso = () => toast.success('Cambio exitoso!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const exitoso2 = () => toast.success('Se actualizara su nombre cuando reinicie secion', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const contraseñaIncorrecta = () => toast.error('La contraseña debe tener mas de 6 caracteres y contener 1 numero!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const nombreCorto = () => toast.error('el nombre debe tener minimo 3 caracteres', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const sindatos = () => toast.error('Dedes de llenar una minimo', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const nombreLargo = () => toast.error('El nombre no debe contener mas de 16 caracteres',
        {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    const actualizar = async () => {
        const { data }: { data: any } = await axios.get(`${URLrequests}api/users/${id}`)
        const email2 = data.user.email
        async function fetchPost() {
            try {
                const { data }: { data: any } = await axios.post(`${URLrequests}api/auth`, { email: email2, password: state.password });
                if (data.ok) {
                    dispatch(loginNormal(data));
                }
            } catch (error) {
                console.error(error);
            }
        }
        if (state.password) {
            return fetchPost()
        }
        if (state.name && !state.password) {
            return exitoso2()
        }

    }
    //funcion para la entrada de los estados
    function inputChange(e: any) {
        setstate((prevState: any) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }
    //funcion para guardar la informacion de la imagen
    const handleFileChange = (e: any) => {

        const pic = e.target.files[0]
        setimg(pic.name);

    }
    //funcion para verificar y hacer cambios en la api
    async function postModificar(e: any) {
        e.preventDefault()
        //verificaciones
        if (!img && !state.name && !state.password) {
            return sindatos()
        }
        if (state.name.length >= 1 && state.name.length <= 2) {
            return nombreCorto()
        }
        if (state.name.length > 25) {
            return nombreLargo()
        }
        if (state.password) {
            if (state.password !== state.comfirm_password) { return contraseña2incorrecta() }
            const ck_password = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            if (!ck_password.test(state.password)) {
                return contraseñaIncorrecta()
            }
        }

        //funcion para cambios
        async function echo() {
            const url = await fileUpload(img)
            await axios.put(`${URLrequests}api/users/edit/${id}`, { name: state.name, password: state.password, avatar: url })
            exitoso()
            actualizar()
        }

        echo()
    }
    return <div>
        <div>
            <Nav />
        </div>
        <div className="form-v8">
            <div className="page-content">
                <div className="form-v8-content">
                    <div className="form-left">
                        <img className='imagform' src={authGoo.logNormal.image} alt="form" />
                    </div>
                    <div className="form-right">
                        <img className='imgUser' src={authGoo.logNormal.image} alt={authGoo.logNormal.name} />
                        <form className="form-detail" onSubmit={postModificar}>
                            <div className="tabcontent" id="sign-up">
                                <div className="form-row">
                                    <input type="file" onChange={handleFileChange} className="custom-file-input" id="customFile" />
                                    <label
                                        className="custom-file-label"
                                        htmlFor="customFile">
                                        {`${img.slice(0,25)}...` || "Adjuntar imagen"}
                                    </label>
                                </div>
                                <div className="form-row">
                                    <label ></label>
                                    <label ></label>
                                </div>
                                <div className="form-row">
                                    <label ></label>
                                    <label ></label>
                                </div>
                                <div className="form-row">
                                    <label ></label>
                                    <label ></label>
                                </div>
                                <div className="form-row">
                                    <label className="form-row-inner">
                                        <input
                                            type="text"
                                            maxLength={25}
                                            name="name" id="full_name" className="input-text" value={state.name} onChange={inputChange} />
                                        <span className="label">Nombre</span>
                                        <span className="border"></span>
                                    </label>
                                </div>
                                <div className="form-row">
                                    <label className="form-row-inner">
                                        <input type="password" name="password" id="password" className="input-text" value={state.password} onChange={inputChange} />
                                        <span className="label">Nueva Password</span>
                                        <span className="border"></span>
                                    </label>
                                </div>
                                <div className="form-row">
                                    <label className="form-row-inner">
                                        <input type="password" name="comfirm_password" id="comfirm_password" className="input-text" value={state.comfirm_password} onChange={inputChange} />
                                        <span className="label">Confirmar Password</span>
                                        <span className="border"></span>
                                    </label>
                                </div>
                                <div className="form-row-last">
                                    <input type="submit" className="modificar" />
                                </div>
                            </div>
                        </form>

                    </div>
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
}