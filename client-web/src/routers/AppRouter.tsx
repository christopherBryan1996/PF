import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from '../components/About';
import EventDetails from '../components/EventDetails';
import { Home } from '../components/Home';
import LandingPage from '../components/LandingPage';
import Login from '../components/Login';
import { Nav } from '../components/Nav';
import NewEvent from '../components/NewEvent';
import Register from '../components/Register';
import Mapa from '../components/Mapa';
import { ModificarUser } from '../components/modifar/Modificar';
import MapaHome from '../components/MapaHome';
import AsistentesPage from '../components/AsistentesPage';
import Favorites from '../components/Favorites';

import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    {/* <Route path="/" component={Nav} /> */}
                    <PublicRoutes exact path="/favorites" component={Favorites} />
                    <PublicRoutes exact path="/" component={LandingPage} />
                    <PrivateRoutes exact path="/home" component={Home} />
                    <PrivateRoutes exact path="/details" component={EventDetails} />
                    <PublicRoutes exact path="/about" component={About} />
                    <PublicRoutes exact path="/Login" component={Login} />
                    <PublicRoutes exact path="/Register" component={Register} />
                    <PrivateRoutes exact path="/NewEvent" component={NewEvent} />
                    <PrivateRoutes exact path="/mapa" component={Mapa} />
                     {/* ruta para modificar usuario */}
                    <PrivateRoutes exact path='/modificarUser/:id' component={ModificarUser}/>
                    <PrivateRoutes exact path="/:username/:eventid" component={AsistentesPage} />
                </Switch>
            </div>
        </Router>
    )
};

