import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';



ReactDOM.render(
  <React.StrictMode>
<<<<<<< HEAD
    <BrowserRouter>
      <Route  exact path="/" component={Nav}/>
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
=======
    <App/>
>>>>>>> c334896d972f7f6bdd5a0d69dc8bcca1149b87d8
  </React.StrictMode>,
  document.getElementById('root')
);


