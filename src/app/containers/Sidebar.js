import React, { Component } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';

export default class Sidebar extends Component {
    state = {

    }

    render() {

        return (
            <div style={styles.container}>

            </div>
        )
    }

}

const styles = {
    container: {
        position: "fixed",
        width: 200,
        height: "100vh",
        // backgroundColor: "red",
        zIndex: 2000,
        top: 0,
        boxShadow: "0px 4px 7px 0px rgba(0,0,0,0.3)",
        backgroundColor: "white"
        },
}