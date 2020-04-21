import React, { Component } from 'react';
import { auth } from '../Firebase';

export default class Dashboard extends Component {
    state = {
        user: null
    }

    componentWillMount() {
        const user = auth.currentUser;

        if (user) {
        // User is signed in.
        } else {
            window.location.href = "login";
        }
    }

    render() {
        return (
            <div style={styles.container}>
                Dashboard
            </div>
        );
    }
}


const styles = {
    container: {
    },
}