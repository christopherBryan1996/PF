
import { IoMdNotificationsOutline, IoMdExit } from "react-icons/io";
import './Dash.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUsers } from '../../actions/actions';
import { ImBin } from 'react-icons/im';




export const Dash = () => {

    
    const [search, setSearch] = useState('')
    const { users } = useSelector((state: any) => state.users)
    console.log('users:', users)
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getUsers());

    }, [])


    const handlrOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        console.log(search)
    }



    return (
        <>
            <div className="container container-dash">

                <div className="searchUs">
                    <h2>Usuarios</h2>
                
                        <input
                            type="text"
                            className="form-control search col-md-3"
                            placeholder="Buscar usuario..."
                            onChange={handlrOnchange}
                        />
                    


                </div>


                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Email</th>
                            <th scope="col">Activo</th>
                        </tr>
                    </thead>
                    {
                        users.filter((val: any) => {
                            if (search === '') {
                                return val
                            } else if (val.usuario.toLowerCase().includes(search.toLocaleLowerCase())) {
                                return val
                            }
                        }).map((user: any) => (
                            <tbody key={user._id} >
                                <tr>
                                    <td>{user.usuario}</td>
                                    <td>{user.email}</td>
                                    <td> <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" /></td>
                                </tr>

                            </tbody>

                        ))
                    }

                </table>
            </div>
        </>
    )
}
