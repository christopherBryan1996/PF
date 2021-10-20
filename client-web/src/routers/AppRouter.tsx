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
import MapaHome from '../components/MapaHome';
import AsistentesPage from '../components/AsistentesPage';
import { onAuthStateChanged } from '@firebase/auth';
import { getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../actions/actions';


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
                {/* <Route path="/" component={Nav} /> */}
                <Route exact path="/mapaHome" component={MapaHome} />
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/details" component={EventDetails} />
                <Route exact path="/about" component={About} />
                <Route exact path="/Login" component={Login} />
                <Route exact path="/Register" component={Register} />
                <Route exact path="/NewEvent" component={NewEvent} />
                <Route exact path="/mapa" component={Mapa} />
                <Route exact path="/:username/:eventid" component={AsistentesPage} />
            </div>
        </Router>
    )
};

