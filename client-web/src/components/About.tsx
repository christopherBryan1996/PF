import React from "react";
import './styles/About.css';
import { useHistory } from "react-router-dom";
import fondo from '../images/fondoAbout.jpg';

export default function About() {

    const history = useHistory();
    const back = () => {
        history.push("/")
    };

    return(
        <div  className="divpadre">
            <div className="divnav">
                <button onClick={back} className="botonback">Back</button>
                <h1 className="titulo">Sobre Nosotros</h1>
            </div>
            <div className="tarjeta">
                <h5 className="tarjetatexto">Somos un grupo de 8 estudiantes del bootcamp de soyhenry.com
                    Hemos desarrollado esta App a modo de entrega en la etapa de proyecto final, pero aspiramos llevarla a algo mucho más grande.

                    La App consiste en poder crear eventos en los cuales puedes tener el completo control logístico y económico del mismo. Tambien puedes unirte a eventos  que desees desde el mapa de visualizaciones.

                    Tecnologias:</h5>
            </div>
        </div>
    )
}