import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { auth } from './Firebase';

import Dashboard from './containers/Dashboard';
import Info from './containers/Info';
import Login from './containers/Login';
import Menu from './containers/Menu';

export default class App extends Component {
    state = { 
        user: null
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                if(window.location.href.split("/")[3] !== "") {
                    window.location.href = "/";
                }
                this.setState({user})
            } else if(window.location.href.split("/")[3] !== "login") {
                window.location.href = "login";
            }
        });
    }
    
    render() {
        const { user } = this.state; 
        return (
            <Router>
                <Switch>
                    <Route path="/info">
                        <Info user={user} />
                    </Route>
                    <Route path="/menu">
                        <Menu user={user} />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/">
                        <Dashboard user={user} />
                    </Route>
                </Switch>
            </Router>
        );
    }
}
