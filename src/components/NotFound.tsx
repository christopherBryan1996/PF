import React, { useEffect } from "react";
import { Nav } from "./Nav";
import notfound from "../img/notfound.jpg"

export default function NotFound(): JSX.Element {

    return(
        <div>
        <div className="divDelNav"><Nav></Nav></div>
        <div>404 Page not found</div>
        <img src={notfound} alt="no existe esta pagina" width="500" height="400"/>
        </div>
    )

}