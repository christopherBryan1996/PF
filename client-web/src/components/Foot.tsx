import React from "react";
import  "./styles/Foot.css";
import { Link } from "react-router-dom";



export default function Foot() {
    
    
    
    return(
        <div>
            <div className="linea"></div>
            <div className="contenedorFinal">
                <div className="p">
                    <p>2021 ©ClanFest All rights reserved</p>
                </div>
                <div className="divUl"> 
                    <ul className="listafinal">
                        <li> <Link to="/home"> <p>Home</p> </Link> </li>
                        <li> <Link to="/About"> <p>About Us</p> </Link> </li>
                        <li><p>Twitter</p></li>
                        <li> <a href="https://www.facebook.com/brian.ramos.71271/videos/826579387874133/"> <p>Facebook</p> </a> </li>
                        <li> <a href="https://www.soyhenry.com/"> <p>Henry</p> </a> </li>
                        <li> <a href="https://www.instagram.com/reel/CTNbinrnCrI/?utm_medium=copy_link"> <p>Linkedin</p> </a> </li>
                        <li> <a href="https://www.instagram.com/reel/CT0jN4OgC_g/?utm_medium=copy_link"> <p>Privacy Policy</p> </a> </li>
                        <li> <Link to="/Register"> <p>Register</p> </Link> </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}