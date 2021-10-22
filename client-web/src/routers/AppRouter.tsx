import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from '../components/About';
import EventDetails from '../components/EventDetails';
import { Home } from '../components/Home';
import LandingPage from '../components/LandingPage';
import Login from '../components/Login';
import NewEvent from '../components/NewEvent';
import Register from '../components/Register';
import Mapa from '../components/Mapa';
import { ModificarUser } from '../components/modifar/Modificar';
import MapaHome from '../components/MapaHome';
import AsistentesPage from '../components/AsistentesPage';
import { onAuthStateChanged } from '@firebase/auth';
import { getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../actions/actions';

import Favorites from '../components/Favorites';



import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

export const AppRouter = () => {

    const dispatch = useDispatch()
    const auth = getAuth()
    const [cheking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {

            if (user?.uid) {
                dispatch(login(user.uid, user.displayName, user.photoURL))
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

                    {/* <PublicRoutes exact path="/favorites" component={Favorites} /> */}

                    <PublicRoutes exact path="/" component={LandingPage} />
                    <PrivateRoutes exact path="/home" component={Home} />
                    <PrivateRoutes exact path="/home/:eventid" component={EventDetails} />
                    <PublicRoutes exact path="/about" component={About} />
                    <PublicRoutes exact path="/Login" component={Login} />
                    <PublicRoutes exact path="/Register" component={Register} />
                    <PrivateRoutes exact path="/NewEvent" component={NewEvent} />
                    <PrivateRoutes exact path="/mapa" component={Mapa} />

                    <PrivateRoutes exact path="/home/:username/favorites" component={Favorites} />

                     {/* ruta para modificar usuario */}
                    <PrivateRoutes exact path='/modificarUser/:id' component={ModificarUser}/>
                    <PrivateRoutes exact path="/:username/:eventid" component={AsistentesPage} />
                </Switch>
            </div>
        </Router>
    )
};