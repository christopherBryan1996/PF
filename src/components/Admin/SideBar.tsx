import React from 'react'
import { getUsers, getEvents, admin } from '../../actions/actions';
import './SideBar.css'
import { useDispatch, useSelector, } from 'react-redux';
import { Link } from 'react-router-dom';

export const SideBar = () => {

    const { authGoo } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    function handleOnclicK() {

        dispatch(admin(1))

    }

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
                   <Link to={'/home'}><h4>ClanFest</h4></Link> 
                </div>

                <div className="linea"></div>

                <div className="avatar">
                    <div className='foto'>
                        <img src={authGoo.logNormal && authGoo.logNormal.image} alt="Avatar" width="60" height="60" />

                    </div>
                    <div className='foto'>
                        <p>{authGoo.logNormal && authGoo.logNormal.name}</p>
                        <p>Admin</p>
                    </div>
                </div>
                <div className="linea"></div>
                <div className="btn-container">
                    <button className='boton' onClick={handleOnclicK}>Usuarios</button>
                </div>
                <div className="btn-container">
                    <button className='boton' onClick={handleOnclicKEvents}>Eventos</button>
                </div>
                <div className="btn-container">
                    <button className='boton'  onClick={handleOnclicKVentas}>Pagos</button>
                </div>



            </div>


        </>
    )
}
