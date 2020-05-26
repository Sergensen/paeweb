import React, { Component } from 'react';
import { MdAccountCircle, MdNotificationsNone, MdFullscreen, MdSettings } from 'react-icons/md'
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

export default class Header extends Component {
    state = {

    }

    render() {

        return (
            <div style={styles.container}>
                <div style={{ color: "white", fontSize: 25, fontWeight: "bold", margin: "5px 25px 5px 25px" }}>
                    <Button size="lg" variant="outline-warning"><Link to="/" style={{ color: "white", flex: 1, justifyContent: "center", alignItems: "center", display: "flex" }}>Zurück</Link></Button>
                </div>
                <div style={{ color: "white", fontSize: 25, fontWeight: "bold", margin: "5px 25px 5px 25px" }}>
                    Willkommen zurück, Ilja!
                </div>
                <div style={{ display: "flex" }}>
                    <MdFullscreen color={"white"} size={30} style={{ ...styles.icon }} />
                    <div style={{ position: "relative" }}>
                        <div style={{ position: "absolute", top: -2, left: 12, backgroundColor: "rgba(255, 15, 0, 0.8)", borderRadius: 1000, padding: 5, width: 20, height: 20, color: "white", fontSize: 12, fontWeight: "bold", lineHeight: 0.8, textAlign: "center", boxShadow: "0px 0px 5px 0px rgba(255,0,0,1)" }}>3</div>
                        <MdNotificationsNone color={"white"} size={30} style={styles.icon} />
                    </div>
                    <MdAccountCircle color={"white"} size={30} style={{ ...styles.icon }} />
                    <MdSettings color={"white"} size={29} style={{ ...styles.icon }} />

                </div>

            </div>
        )
    }

}

const styles = {
    container: {
        position: "fixed",
        top: 0,
        width: "calc(100% - 200px)",
        height: 50,
        // backgroundColor: "blue",
        zIndex: 1000,
        left: 200,
        background: "rgb(255,119,0)",
        background: "linear-gradient(90deg, rgba(255,119,0,1) 0%, rgba(255,154,51,1) 65%, rgba(245,161,76,1) 100%)",
        // backgroundColor: "red"
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    icon: {
        marginRight: 15,
        cursor: "pointer"
    }
}