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
import Sidebar from './containers/Sidebar'
import Header from './containers/Header'

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
            <div style={{
                //display: "flex", flexDirection: "row", 
                backgroundColor: "#ededed"
            }}>
                <Header />
                <Sidebar />



                {/* <div style={{ position: "absolute", zIndex: -100, backgroundColor: "#ededed", width: "100vw", height: "100vh", }} /> */}
                <div style={{
                    // display: "flex", flex: 1, justifyContent: "center", flexDirection: "column"
                }}>
                    <div style={{
                        marginLeft: 200,
                        marginTop: 50
                    }}>
                        <div style={{
                            width: "100%", height: 250, backgroundColor: "red", position: "absolute", top: 0, background: "rgb(255,119,0)",
                            background: "linear-gradient(90deg, rgba(255,119,0,1) 0%, rgba(255,154,51,1) 65%, rgba(245,161,76,1) 100%)",
                        }} />

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

                </div>
            </div>

        );
    }
}
