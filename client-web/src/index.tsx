import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <App/>

import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import EventDetails from './components/EventDetails';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import NewEvent from './components/NewEvent';
import { Home } from './components/Home';
import { Nav } from './components/Nav';
import Mapa from './components/Mapa';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route  path="/" component={Nav}/>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/app" component={App}/>
      <Route exact path="/details" component={EventDetails} />
      <Route exact path="/about" component={About}/>
      <Route exact path="/Login" component={Login}/>
      <Route exact path="/Register" component={Register}/>
      <Route exact path="/mapa" component={Mapa}/>
      <Route exact path="/NewEvent" component={NewEvent}/>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);


