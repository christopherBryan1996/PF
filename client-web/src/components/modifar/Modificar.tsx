import {useParams} from 'react-router'
import axios from 'axios'
import logo from '../../images/Logo.png'
import { Link } from 'react-router-dom'
import './css/style.css'
import './css/sourcesanspro-font.css'
import image from './images/form-v8.jpg'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { loginNormal } from '../../actions/actions'
import { useDispatch, useSelector } from "react-redux";

export const ModificarUser=()=>{
    //traemos lo que este en id del params
    const {id}= useParams() as any
    const {authGoo}=useSelector((state:any)=>state);
    const dispatch = useDispatch();
    //creamos un estado de objetos
    const [state, setstate] = useState({
        name:'',
        password:'',
        comfirm_password:'',
    })
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
    //funcion para la entrada de los estados
    function inputChange(e:any){
        setstate((prevState:any)=>{
            return{
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }
    //funcion para verificar y hacer cambios en la api
    async function postModificar(e:any) {
        e.preventDefault()
        //verificaciones
        if(state.name.length >=3){
            if(!state.password){
                return echo()
            }
        }else if(state.name.length>=1){
            return nombreCorto()
        }
        if (state.password !== state.comfirm_password) { return contraseña2incorrecta() }
        const ck_password = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (!ck_password.test(state.password)) {
            return contraseñaIncorrecta()
        };
        //funcion para cambios
        async function echo(){
            await axios.put(`https://api-fest.herokuapp.com/api/users/edit/${id}`,{name:state.name,password:state.password})
            dispatch(loginNormal({email: authGoo.logNormal.email, password: state.password}))
            exitoso()
        } 
       
        echo()
    }
    
    return <div>
        <div>
            <Link to='/home'>
             <img className='logo' src={logo} alt='logo'/>
            </Link>
        </div>
        <div className="form-v8">
	        <div className="page-content">
		        <div className="form-v8-content">
			        <div className="form-left">
				        <img src={image} alt="form"/>
			        </div>
			        <div className="form-right">
				        <div className="tab">
					        <div className="tab-inner">
						        {<button className="tablinks" id="defaultOpen">Modificar</button> }
					        </div>
				        </div>
				        <form className="form-detail" onSubmit={postModificar}>
					        <div className="tabcontent" id="sign-up">
						        <div className="form-row">
							        <label className="form-row-inner">
								        <input type="text" name="name" id="full_name" className="input-text"   value={state.name} onChange={inputChange} />
								        <span className="label">Username</span>
		  						        <span className="border"></span>
							        </label>
						        </div>
						        <div className="form-row">
							        <label className="form-row-inner">
								        <input type="password" name="password" id="password" className="input-text" value={state.password} onChange={inputChange} />
								        <span className="label">Password</span>
								        <span className="border"></span>
							        </label>
						        </div>
						        <div className="form-row">
							        <label className="form-row-inner">
								        <input type="password" name="comfirm_password" id="comfirm_password" className="input-text" value={state.comfirm_password} onChange={inputChange} />
								        <span className="label">Comfirm Password</span>
								        <span className="border"></span>
							        </label>
						        </div>
						        <div className="form-row-last">
							        <input type="submit"  className="modificar" />
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