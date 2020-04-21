import React, { Component } from 'react';

import PasswordReset from "../components/login/PasswordReset";
import SignIn from "../components/login/SignIn";
import SignUp from "../components/login/SignUp";

export default class Login extends Component {
    render() {
        return (
            <div style={styles.container}>
                Login
            </div>
        );
    }
}


const styles = {
    container: {
    },
}