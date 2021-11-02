import React, { useEffect, useState } from 'react'
import { ImBin } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../../actions/actions'
import { deleteEventAdm } from '../../controllers/eventos/eventoscontrollers';
import { Modal } from '../modal/Modal'
import { BotonEliminar } from '../modal/styled';

export const EventsAdmin = () => {
    const [estadoModal, setestadoModal] = useState(false)
    const [id, setid] = useState('')
    const [search, setSearch] = useState('')
    const [currentPage, setcurrentPage] = useState(0)
    const dispatch = useDispatch()
    const { eventos } = useSelector((state: any) => state.eventos)
    console.log('Evenetos:', eventos)




    useEffect(() => {

        dispatch(getEvents());

    }, []);

    const filerEvents = () => {
        if (search.length === 0)
            return eventos.slice(currentPage, currentPage + 8)

        const filtered = eventos.filter((val: any) => {
            if (search === '') {
                return val
            } else if (val.nombreDelEvento.toLowerCase().includes(search.toLocaleLowerCase())) {
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
        setSearch(e.target.value)

    }

    const handleOnclick = (id: string) => {
        setid(id)
        setestadoModal(true)
       console.log('id a eliminar:', id)

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
                    <Modal
                        id={id}
                        estado={estadoModal}
                        cambiarEstado={setestadoModal}>
                        <h4>Seguro quiere eliminar el evento?</h4>
                        <BotonEliminar onClick={() => {deleteEventAdm(id); setestadoModal(false) }} >Eliminar</BotonEliminar>
                        console.log(evento._id)
                    </Modal>
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
                        filerEvents().map((evento: any) => (


                            <tbody key={evento._id} >

                                <tr>

                                    <td>{evento.nombreDelEvento}</td>
                                    <td>{evento.fecha.slice(0, 10)}</td>
                                    <td>{evento.publico ? 'si' : 'no'}</td>
                                    <td>{evento.precio}</td>
                                    <td> <ImBin className="icon-delete" fontSize="1.3em" onClick={() => {handleOnclick(evento._id) }} />  </td>
                                </tr>
                            </tbody>
                        ))
                    }

                </table>
                <button onClick={prevPage} className='btn btn-success'>Antrior</button>
                <button onClick={nextPage} className='btn btn-success'> Siguitnete</button>
            </div>

        </>

    )
}
