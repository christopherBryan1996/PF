import React, { useEffect, useState } from 'react'
import { ImBin } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../../actions/actions'

export const EventsAdmin = () => {

    const [search, setSearch] = useState('')

    const dispatch = useDispatch()
    const { eventos } = useSelector((state: any) => state.eventos)
    console.log('Evenetos:', eventos)

    useEffect(() => {

        dispatch(getEvents());

    }, [])

    const handlrOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        console.log(search)
    }

    return (

        <>
            <div className="container container-dash">


                <div className="searchUs">
                    <h2>Eventos</h2>

                    <input
                        type="text"
                        className="form-control search col-md-3"
                        placeholder="Buscar Evento..."
                        onChange={handlrOnchange}
                    />
                </div>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Publico</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Accion</th>

                        </tr>
                    </thead>
                    {
                        eventos.filter((val: any) => {
                            if (search === '') {
                                return val
                            } else if (val.nombreDelEvento.toLowerCase().includes(search.toLocaleLowerCase())) {
                                return val
                            }
                        }).map((evento: any) => (
                            <tbody key={evento._id} >
                                <tr>
                                    <td>{evento.nombreDelEvento}</td>
                                    <td>{evento.fecha.slice(0, 10)}</td>
                                    <td>{evento.publico ? 'si' : 'no'}</td>
                                    <td>{evento.precio}</td>
                                    <td>  <ImBin className="icon-delete" fontSize="1.3em" /></td>
                                </tr>

                            </tbody>

                        ))
                    }

                </table>
            </div>
        </>

    )
}
