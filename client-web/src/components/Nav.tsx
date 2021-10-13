import "./styles/Nav.css";
import { ImHeart } from "react-icons/im";


export const Nav = () => {
    return (

        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="#">CLANFEST</a>
                <form className="navbar-center">
                    <input type="text" className="form-control" placeholder="Buscar evento..." aria-label="Username" aria-describedby="basic-addon1" />
                </form>
                <div className="fff">
                <a href=""> <ImHeart color="white" fontSize="1.8em"/></a>
                <a href=""><img src="http://assets.stickpng.com/thumbs/585e4bcdcb11b227491c3396.png" alt="" width="50" height="50" /></a>
                </div>
            </div>
        </nav>

    )
}
