import React, { Component } from 'react';
// import { Button, Modal, Card } from 'react-bootstrap';
import { MdArrowBack, MdShoppingCart, MdStore, MdDashboard } from 'react-icons/md'
import { FaEdit, FaQrcode } from 'react-icons/fa'
import Dashboard from './Dashboard';

export default class Sidebar extends Component {
    state = {

    }

    render() {

        return (
            <div style={styles.container}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 10}}>
                    <img style={styles.image} src={require("../res/images/Logo.png")} />
                    <div style={{fontWeight: "bold", color: "black", fontSize: 45, fontStyle: "italic"}}>
                        Pae
                    </div>
                </div>
                <div>
                    <ul style={{listStyleType: "none", fontSize: 17, paddingLeft: 0,paddingTop: 5, paddingBottom: 5}} className={"sidebarList"}>
                        <li style={{backgroundColor: "rgba(0,0,0,.1)"}}><MdDashboard size={20} color={"rgba(0,0,0,.75)"} style={{marginRight: 10}}/>Dashboard</li>
                        <li><MdStore size={20} color={"rgba(0,0,0,.75)"} style={{marginRight: 10}}/> Betriebs-Info</li>
                        <li><FaEdit size={18} color={"rgba(0,0,0,.75)"} style={{marginLeft: 4, marginRight: 10}}/>Speisekarte</li>
                        <li><MdShoppingCart color={"rgba(0,0,0,.75)"} size={19} style={{marginLeft: 2, marginRight: 10}}/>Bestellungen</li>
                        <li><FaQrcode size={18} color={"rgba(0,0,0,.75)"} style={{marginLeft: 4, marginRight: 10}}/>Qr-Codes</li>
                    </ul>


                </div>
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
    image: {
        height: 50,
        width: 50,
        marginRight: 5
    }
}