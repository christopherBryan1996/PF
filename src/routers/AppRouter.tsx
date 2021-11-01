import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import About from '../components/About';
import EventDetails from '../components/EventDetails';
import { Home } from '../components/Home';
import { HomePrueba } from '../components/HomePrueba';
import LandingPage from '../components/LandingPage';
import Login from '../components/Login';
import NewEvent from '../components/NewEvent';
import Register from '../components/Register';
import Mapa from '../components/Mapa';
import { ModificarUser } from '../components/modifar/Modificar';
import MapaHome from '../components/MapaHome';
import Perfil from '../components/Perfil';
import AsistentesPage from '../components/AsistentesPage';
import { onAuthStateChanged } from '@firebase/auth';
import { getAuth } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, socketConfig } from '../actions/actions';
import Favorites from '../components/Favorites';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import MercadoPago from '../components/MercadoPay';
import '../components/styles/Loading.css';
import ModificarEvento from '../components/ModificarEvento';
import EventosAsistir from "../components/EventosAsistir";
import MercadoPay from '../components/MercadoPay';

import '../components/styles/Loading.css'
import { AdminScreen } from '../components/Admin/AdminScreen'
import { FavoritesInv }from '../components/FavoritesInvit';


export const AppRouter = () => {

    const dispatch = useDispatch()
    const auth = getAuth()
    const [cheking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    const userLogged: any = useSelector((state: any) => state.authGoo.state)
    const isAuthenticated = !userLogged ? false : true;

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {

            if (user?.uid) {
                const datos = {
                    user: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                }
                dispatch(login(datos))
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }

            setChecking(false)

            console.log('Usuario:', user);

        })

    }, [dispatch, setChecking, auth])

    //conexion a SocketIo------------------------------------------
    const { authGoo } = useSelector((state: any) => state);
    useEffect((): any => {
        authGoo.logNormal && dispatch(socketConfig(authGoo.logNormal.uid, authGoo.logNormal.name));
    }, [])
    useEffect(():any => {
        authGoo.logNormal && dispatch(socketConfig(authGoo.logNormal.uid, authGoo.logNormal.name));   
      }, [dispatch, authGoo])

    if (cheking) {
        return (
            <div className="loading">
                <img src="https://media.giphy.com/media/6276Pinlkx8kSDJLxK/giphy.gif" />
                <img src="https://media.giphy.com/media/6276Pinlkx8kSDJLxK/giphy.gif" alt="loading"/>
            </div>
            // <img src="http://res.cloudinary.com/dejlsgnm9/image/upload/v1634753139/vvlzoxmw4rba7yo05etm.gif" alt="" />
        )
    }

    return (
        <Router>
            <div>

                <Switch>
                    {/* <Route path="/" component={Nav} /> */}

                    {/* ruta para modificar usuario */}


                    {/* <PublicRoute exact path="/favorites" component={Favorites} /> */}

                    <PublicRoute exact path="/detail/:eventid" component={EventDetails} />
                    <PublicRoute exact path="/mercadopago" component={MercadoPay} />

                    <PublicRoute
                        exact path="/"
                        component={LandingPage} />
                    <PublicRoute
                        exact path="/home"
                        component={Home}
                    />
                    <PublicRoute
                    exact path="/homePrueba"
                    component={HomePrueba}
                     />
                    <PublicRoute
                        exact path="/about"
                        component={About} />
                    <PublicRoute
                        exact path="/Login"
                        // isAuthenticated={isAuthenticated}
                        component={Login} />

                    <PublicRoute
                        exact path="/Register"
                        component={Register} />
                    <PrivateRoute
                        exact path="/NewEvent"
                        isAuthenticated={isAuthenticated}
                        component={NewEvent} />
                    <PrivateRoute
                        exact path="/mapa"
                        isAuthenticated={isAuthenticated}
                        component={Mapa} />
                    <PublicRoute
                        exact path="/home/:username/favorites"
                        // isAuthenticated={isAuthenticated}
                        component={Favorites} />
                    <PublicRoute
                    exact path="/home/favorites"
                    component={FavoritesInv} />
                    <PrivateRoute
                        exact path='/modificarUser/:id'
                        isAuthenticated={isAuthenticated}
                        component={ModificarUser} />
                    <PrivateRoute
                        exact path="/asistentes/:uid/:eventid"
                        isAuthenticated={isAuthenticated}
                        component={AsistentesPage} />
                    <PrivateRoute
                        exact path="/modificarEventos/:eventid"
                        isAuthenticated={isAuthenticated}
                        component={ModificarEvento} />

                    <PrivateRoute
                        exact path="/admin/"
                        isAuthenticated={isAuthenticated}
                        component={AdminScreen} />

                        <PrivateRoute
                        exact path="/misEventos/:uid"
                        isAuthenticated={isAuthenticated}                        
                        component={EventosAsistir}/>

                    <PrivateRoute exact path="/home/usuario/:username" isAuthenticated={isAuthenticated} component={Perfil} />
                </Switch>
            </div>
        </Router>
    )
};