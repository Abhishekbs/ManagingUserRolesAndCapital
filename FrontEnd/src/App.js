import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/DashBoard';
import Login from './Components/Login';
import Error from './Components/Error';
import ProtectedRoutes from './Components/protectedRoutes'

class App extends Component {
  render() {
    return ( 
      <BrowserRouter>
        <Switch>
          <ProtectedRoutes  path="/" component={Home} exact/>
          {/* <Route  path="/" component={Home} exact/> */}
          <Route path="/login" component={Login} />
          <Route path="/Error" component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
