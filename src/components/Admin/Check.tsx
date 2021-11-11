import { useState } from "react"
import './Dash.css'
import Switch from '@material-ui/core/Switch'
import Button from "@material-ui/core/Button"
import { useDispatch } from "react-redux"

import { inhabilitarUs } from "../../actions/actions"
import { GreenSwitch } from "./GreenSwitch"
import { toast, ToastContainer } from "react-toastify";

interface Iprops {
    nombre: string;
    email: string;
    id: string;
    estado: boolean
}


export const Check = (props: Iprops) => {

    const { nombre, email, id, estado } = props

    const [value, setvalue] = useState('')
    const [accion, setaccion] = useState(estado)
    const dispatch = useDispatch()





    const handleChange = (e: any) => {

        console.log(e.target.value)
        setvalue(e.target.value)
        setaccion(!accion)
    }
    const handleOnClick = () => {

        dispatch(inhabilitarUs(value, accion))
        console.log('enviado desde boton', value, accion)
        eventoNoAgregado()

    }


    const eventoNoAgregado = () =>
        toast.success("Cambios guardados correctamente", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,

        });

    return (

        <>
        <tr>
            <td>{nombre}</td>
            <td>{email}</td>
            <td>{accion ? <GreenSwitch

                defaultChecked
                value={id}
                onChange={(e: any) => handleChange(e)}
            /> : <GreenSwitch
                value={id}
                onChange={(e: any) => handleChange(e)}
            />}</td>
            <td> <button className="btn btn-secondary" type="button"onClick={handleOnClick} >
               Guardar
            </button></td>
        </tr>
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
        </>
    )
}
