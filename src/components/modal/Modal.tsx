import { Overlay, ContenedorModal, EncabezadoModal, Boton, BotonEliminar } from "./styled"


export const Modal = ({ children, estado, cambiarEstado, id }: any) => {

    return (
        <>
            {estado &&
                <Overlay>

                    <ContenedorModal>
                        <EncabezadoModal>
                            <h3>Confirmacion</h3>
                        </EncabezadoModal>
                        <Boton onClick={() => cambiarEstado(false)} >X</Boton>
                        {children}
                    </ContenedorModal>

                </Overlay>
            }
        </>
    )
}
