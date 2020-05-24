import React, { Component } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';

export default class Header extends Component {
    state = {

    }

    render() {

        return(
            <div style={styles.container}>

            </div>
        )
    }

}

const styles = {
    container:{
        position: "fixed",
        top: 0,
        width: "calc(100% - 200px)",
        height: 50,
        // backgroundColor: "blue",
        zIndex: 1000,
        left: 200,
        background: "rgb(255,119,0)",
        background: "linear-gradient(90deg, rgba(255,119,0,1) 0%, rgba(255,154,51,1) 65%, rgba(245,161,76,1) 100%)",
    
    },
}