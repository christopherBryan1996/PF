import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVentas } from '../../actions/actions'


export const VentasAdmin = () => {

    const [search, setSearch] = useState('')
    const [currentPage, setcurrentPage] = useState(0)
    const dispatch = useDispatch()
    const { ventas } = useSelector((state: any) => state.ventas)
    console.log('ventas:', ventas)

    useEffect(() => {

        dispatch(getVentas());

    }, []);




    const filerEvents = () => {
        if (search.length === 0)
            return ventas.slice(currentPage, currentPage + 8)

        const filtered = ventas.filter((val: any) => {
            if (search === '') {
                return val
            } else if ( val.usuario.toLowerCase().includes(search.toLocaleLowerCase())) {
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

    return (

        <>
            <div className="container container-dash">

                <div className="searchUs">
                    <h2>Ventas</h2>

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
                            <th scope="col">Nombre Comprador</th>
                            <th scope="col">Email Comprador</th>
                            <th scope="col">Evento</th>
                            <th scope="col">Email autor evento</th>

                            <th scope="col">Estado de pago</th>
                            <th scope="col">Precio</th>
                        </tr>
                    </thead>
                    {
                        filerEvents().map((venta: any) => (

                            <tbody key={venta._id} >
                                <tr>
                                    <td>{venta.usuario}</td>
                                    <td>{venta.email}</td>
                                
                                
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
