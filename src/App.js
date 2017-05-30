import React, { Component } from 'react';
// import logo from './logo.svg';
//react router imports
import { BrowserRouter, Route, Router, Link, Switch } from 'react-router-dom';

//components
import Header from './components/header/Header';
import Navigation from './components/navigation/Navigation';
import Welcome from './components/welcome/Welcome';
import CreateTreatment from './components/treatments/create/CreateTreatment';

//treatments
  //condition treatments
  import ConditionTreatment from './components/conditions/treatments/Treatments';



//global styles
import './css/bootstrap/bootstrap.min.css';
import './css/bootstrap/bootstrap-theme.min.css';
import './css/global.css';


//global scripts






class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div id="main">
            <div id="main-container">
              <Header />
              <Navigation />
              <Switch>
                <Route path="/welcome" component={Welcome} />
                <Route path="/treatments/create" component={CreateTreatment} />
                <Route path="/condition/treatments" component={ConditionTreatment} />


              </Switch>
            </div>            
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
