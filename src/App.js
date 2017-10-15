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
import Password from './components/password_reset/request/Password';
import ResetPassword from './components/password_reset/update/Password';
import Verify from './components/verify_email/Verify';
import CreateAccount from './components/create_account/CreateAccount';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import RequireAuth from './components_higher_order/auth/require_auth.js';
import UserAccount from './components/user_account/UserAccount';



//treatments
  //condition treatments
  import ConditionTreatments from './components/conditions/treatments/Treatments';
  import Treatment from './components/treatments/treatment/Treatment';
//conditions
  //find conditions
  import FindConditions from'./components/conditions/find_conditions/Conditions';
  //create condition
  import CreateCondition from './components/conditions/create/CreateCondition';



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
                  <Route path="/verify/:secret/:email" component = {Verify} />
                  <Route path="/reset/:pwtoken/:email" component={ResetPassword} />
                  <Route
                      path="/treatments/create/:conditionID" component={RequireAuth(CreateTreatment) } />
                  <Route path="/condition/:id/treatments" component={ConditionTreatments} />
                  <Route path="/conditions" component={FindConditions} />
                  <Route path="/account" component={UserAccount} />
                  <Route path="/treatment/:id" component={Treatment} />
                  <Route path="/login" component={Login} />
                  <Route path="/logout" component={Logout} />
                  <Route path="/password" component={Password} />
                  <Route path="/create-account" component={CreateAccount} />
                  <Route path="/create-condition" component={RequireAuth(CreateCondition)} />
                  <Route path="/about" component={About} />
                  <Route path="/" component={Welcome} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
