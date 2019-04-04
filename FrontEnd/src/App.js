import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Components/Home';
import ManageUser from './Components/ManageUser';
import ManageCountry from './Components/ManageCountry';
import Login from './Components/Login';
import Error from './Components/Error';
import ProtectedRoutes from './Components/protectedRoutes'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} exact />
          {/* <Redirect from="/" to="/manageuser" /> */}
          <Home>
            <ProtectedRoutes path="/manageuser" component={ManageUser} exact />
            <ProtectedRoutes path="/managecountry" component={ManageCountry} exact />
          </Home>
          <Route path="/Error" component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
