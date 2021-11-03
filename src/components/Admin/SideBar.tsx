
import { admin, logout } from '../../actions/actions';
import './SideBar.css'
import { useDispatch, useSelector, } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { ImExit } from "react-icons/im";
import { getAuth, signOut } from '@firebase/auth';


export const SideBar = () => {
    const history = useHistory();

    const { authGoo, socketIO } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    function handleOnclicK() {

        dispatch(admin(1))

    }

    const landing = () => {
        history.push("/");
    };

    const handleLogout = async () => {

        const auth = getAuth();
        landing()
        dispatch(logout(socketIO.socket));
        await signOut(auth);

        window.location.replace('');



    };

    function handleOnclicKEvents() {
        dispatch(admin(2));
        console.log()
    }
    function handleOnclicKVentas() {
        dispatch(admin(3));
        console.log()
    }


    return (
        <>

            <div className="sideBar-container">
                <div className="titulo">
                    <Link to={'/home'}><h3>ClanFest</h3></Link>
                </div>

                <div className="lineas"></div>

                <div className="avatar">
                    <div className='fotos'>
                        <img src={authGoo.logNormal && authGoo.logNormal.image} alt="Avatar" width="60" height="60" />

                    </div>
                    <div className='fotos'>
                        <h5>{authGoo.logNormal && authGoo.logNormal.name}</h5>
                        <p>Admin</p>
                    </div>
                </div>
                <div className="lineas"></div>
                <div className="container-sideBar-btn">
                    <div className="btn-container">
                        <button className='boton' onClick={handleOnclicK}>Usuarios</button>
                    </div>
                    <div className="btn-container">
                        <button className='boton' onClick={handleOnclicKEvents}>Eventos</button>
                    </div>
                    <div className="btn-container">
                        <button className='boton' onClick={handleOnclicKVentas}>Pagos</button>
                    </div>
                </div>

                <div className="lineas"></div>
                <div className="exit-container">
                    <ImExit fontSize="1.3em" className="imExit" onClick={handleLogout} />
                </div>
                <div className="lineas"></div>
            </div>


        </>
    )
}
