import React, { Component } from 'react';
// import logo from './logo.svg';
//react router imports
import { BrowserRouter, Route, Router, Link, Switch } from 'react-router-dom';

//components
import Header from './components/header/Header';
import Navigation from './components/navigation/Navigation';
import Welcome from './components/welcome/Welcome';
import CreateTreatment from './components/treatments/create/CreateTreatment';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import Password from './components/password_reset/Password';

//treatments
  //condition treatments
  import ConditionTreatments from './components/conditions/treatments/Treatments';
  import Treatment from './components/treatments/treatment/Treatment';
//conditions
  //find conditions
  import FindConditions from'./components/conditions/find_conditions/Conditions';



//global styles
import './css/bootstrap/bootstrap.min.css';
import './css/bootstrap/bootstrap-theme.min.css';
import './css/global.css';





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
                  <Route path="/condition/:id/treatments" component={ConditionTreatments} />
                  <Route path="/conditions" component={FindConditions} />
                  <Route path="/treatment/:id" component={Treatment} />
                  <Route path="/login" component={Login} />
                  <Route path="/logout" component={Logout} />
                  <Route path="/password" component={Password} />
              </Switch>
            </div>            
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
