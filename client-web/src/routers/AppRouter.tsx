import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import About from '../components/About';
import EventDetails from '../components/EventDetails';
import { Home } from '../components/Home';
import LandingPage from '../components/LandingPage';
import Login from '../components/Login';
import NewEvent from '../components/NewEvent';
import Register from '../components/Register';
import Mapa from '../components/Mapa';
import { ModificarUser } from '../components/modifar/Modificar';
import AsistentesPage from '../components/AsistentesPage';
import { onAuthStateChanged } from '@firebase/auth';
import { getAuth } from 'firebase/auth';
import { useDispatch, useSelector} from 'react-redux';
import { login } from '../actions/actions';
import Favorites from '../components/Favorites';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch()
    const auth = getAuth()
    const [cheking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    
    const userLogged:any = useSelector((state:any) => state.authGoo.state)
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
            }else{
                setIsLoggedIn(false)
            }

            setChecking(false)

            console.log('Usuario:', user);

        })

    }, [dispatch, setChecking])


    if (cheking) {
        return (
            <img src="http://res.cloudinary.com/dejlsgnm9/image/upload/v1634753139/vvlzoxmw4rba7yo05etm.gif" alt="" />
        )
    }

    return (
        <Router>
            <div>
            
                <Switch>
                    {/* <Route path="/" component={Nav} /> */}

                    {/* <PublicRoute exact path="/favorites" component={Favorites} /> */}
                    <PublicRoute exact path="/home/:eventid" component={EventDetails} />
                    <PublicRoute 
                    exact path="/"         
                    component={LandingPage} />
                    <PublicRoute  
                    exact path="/home"
                   
                    component={Home} />
                    <PrivateRoute 
                    exact path="/details"        
                    isAuthenticated={isAuthenticated}
                    component={EventDetails} />
                    <PublicRoute 
                    exact path="/about" 
                    component={About} />
                    <PublicRoute 
                    exact path="/Login" 
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
                    <PrivateRoute 
                    exact path="/home/:username/favorites"
                    isAuthenticated={isAuthenticated}
                    component={Favorites} />
                     {/* ruta para modificar usuario */}
                    <PrivateRoute 
                    exact path='/modificarUser/:id'
                    isAuthenticated={isAuthenticated}
                    component={ModificarUser}/>
                    <PrivateRoute
                    exact path="/asistentes/:username/:eventid" 
                    isAuthenticated={isAuthenticated}
                    component={AsistentesPage} />

                </Switch>
            </div>
        </Router>
    )
};