import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { auth, firestore } from './Firebase';
import Dashboard from './containers/Dashboard';
import Info from './containers/Info';
import Login from './containers/Login';
import Menu from './containers/Menu';
import Orders from './containers/Orders';
import API from './Api';

export default class App extends Component {
    state = {
        user: null
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                if (window.location.href.split("/")[3] === "login") {
                    window.location.href = "/";
                }
                this.setState({ user })
            } else if (window.location.href.split("/")[3] !== "login") {
                API.resetShop();
                API.resetCategory();
                window.location.pathname = "/login";
            }
        });
    }

    render() {
        const { user } = this.state;
        return (
            <div>
                <div style={{ position: "absolute",  zIndex: -100, backgroundColor: "#ededed", width: "100vw", height: "100vh", }} />
                <Router >
                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/info">
                            <Info user={user} />
                        </Route>
                        <Route path="/menu">
                            <Menu user={user} />
                        </Route>
                        <Route path="/orders">
                            <Orders user={user} />
                        </Route>
                        <Route path="/">
                            <Dashboard user={user} />
                        </Route>
                    </Switch>
                </Router>
            </div>

        );
    }
}
