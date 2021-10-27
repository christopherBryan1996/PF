import '../components/styles/SideBar.css'
import { IoMdNotificationsOutline, IoMdExit } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUsers } from '../actions/actions';
import { ImBin } from 'react-icons/im';




export const Admin = () => {



    const { users } = useSelector((state: any) => state.users)
    console.log('users:', users)
    const dispatch = useDispatch()


    function handleOnclicK() {
        dispatch(getUsers());
    }


    useEffect(() => {
      
    }, []);




    return (
        <>
            <div className="sidebar">


                <div className="p">
                    <h4>ClanFest</h4>
                </div>
                <div className="linea"></div>
                <div className="container-avatar" >
                    <div className="avatar">
                        <img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" height="67px" alt="" />
                    </div>
                    <div className="nombre" >
                        <p>Raul Camacho</p>
                        <p>Administrador</p>
                    </div>
                </div>
                <div className="linea"></div>
                <div className="p">
                   <button onClick={handleOnclicK}> <h6>Usuarios</h6></button>
                </div>
                <div className="p">
                    <h6>Eventos</h6>
                </div>
                <div className="p">
                    <h6>Ventas</h6>
                </div>
                <div className="container-notificaciones">
                    <div>
                        <IoMdNotificationsOutline fontSize="1.6em" />
                    </div>
                    <div>
                        <IoMdExit fontSize="1.6em" />
                    </div>
                </div>
            </div>
            <div className="contenedor-tablas">
                <div className="nav">

                </div>

                <div className=" container-tables">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Email</th>
                                <th scope="col">Eliminar</th>
                            </tr>
                        </thead>
                        {
                            users.map((user: any) => (

                                <tbody key={user._id}>
                                    <tr>
                                        <td>{user.usuario}</td>
                                        <td>{user.email}</td>
                                        <td>  <ImBin className="icon-delete" fontSize="1.6em"  /></td>

                                    </tr>

                                </tbody>
                            ))
                        }


                    </table>
                </div>
            </div>


        </>
    )
}
