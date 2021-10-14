import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import EventDetails from './components/EventDetails';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import { Home } from './components/Home';
import { Nav } from './components/Nav';

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
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//eeerererer