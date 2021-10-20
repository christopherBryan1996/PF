import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import About from '../components/About';
import EventDetails from '../components/EventDetails';
import { Home } from '../components/Home';
import LandingPage from '../components/LandingPage';
import Login from '../components/Login';
import { Nav } from '../components/Nav';
import NewEvent from '../components/NewEvent';
import Register from '../components/Register';
import Mapa from '../components/Mapa';
<<<<<<< HEAD
import { ModificarUser } from '../components/modifar/Modificar';
=======
import MapaHome from '../components/MapaHome';
import AsistentesPage from '../components/AsistentesPage';
>>>>>>> aa991ecbad93a1b82f84830fee0e893fd1bc5c47


export const AppRouter = () => {
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
<<<<<<< HEAD
                    {/* ruta para modificar usuario */}
                    <Route exact path='/modificarUser/:id' component={ModificarUser}/>
=======
                    <Route exact path="/:username/:eventid" component={AsistentesPage} />
>>>>>>> aa991ecbad93a1b82f84830fee0e893fd1bc5c47
            </div>
        </Router>
    )
};

