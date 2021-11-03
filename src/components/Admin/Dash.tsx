
import { IoMdNotificationsOutline, IoMdExit } from "react-icons/io";
import './Dash.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUsers, inhabilitarUs } from '../../actions/actions';
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import { Check } from "./Check";



export const Dash = () => {

   
    const [search, setSearch] = useState('')
    const [currentPage, setcurrentPage] = useState(0)
    const { users } = useSelector((state: any) => state.users)
    console.log('users:', users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers());
    }, [])

  


    const filerUsers = () => {
        if (search.length === 0)
            return users.slice(currentPage, currentPage + 8)

        const filtered = users.filter((val: any) => {
            if (search === '') {
                return val
            } else if (val.usuario.toLowerCase().includes(search.toLocaleLowerCase())) {
                return val
            }
        })

        return filtered.slice(currentPage, currentPage + 8);

    }

    const nextPage = () => {

        setcurrentPage(currentPage + 8)

    }
    const prevPage = () => {
        if (currentPage > 0) {
            setcurrentPage(currentPage - 8)
        }
    }

  

    const handlrOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setcurrentPage(0);
        setSearch(e.target.value)

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
                        value={search}
                    />

                   

                </div>

                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Email</th>
                            <th scope="col">Activo</th>
                            <th scope="col">Guardar </th>
                        </tr>
                    </thead>
                    {
                        filerUsers().map((user: any) => (
                            <tbody key={user._id} >
                               <Check
                                nombre={user.usuario}
                                email={user.email}
                                id={user._id}   
                                estado={user.habilitado}                            
                               />
                            </tbody>
                        ))
                    }
                </table>
                <button onClick={prevPage} className='btn btn-success'>Anterior</button>
                <button onClick={nextPage} className='btn btn-success'> Siguiente</button>
            </div>
        </>
    )
}
