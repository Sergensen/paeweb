import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Dashboard from './containers/Dashboard';
import Info from './containers/Info';
import Login from './containers/Login';
import Menu from './containers/Menu';

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/info">
                <Info />
            </Route>
            <Route path="/menu">
                <Menu />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/">
                <Dashboard />
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
