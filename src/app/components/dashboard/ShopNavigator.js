import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import QRCode from 'qrcode.react';
import { isMobile } from "react-device-detect";
import { MdArrowBack } from 'react-icons/md'


export default class ShopNavigator extends Component {
    render() {
        const { resetShop, shopId } = this.props;
        return (
            <div>
                <div style={styles.menuContainer}>
                    <div style={{ margin: 5 }}>
                        <Button onClick={() => resetShop()} style={{ color: "white", flex: 1, justifyContent: "center", alignItems: "center", display: "flex" }}><MdArrowBack size={30} />Zurück</Button>
                    </div>
                    <div>
                        Klicke hier um deine Betriebs-Info zu bearbeiten.
                        <Link to="/info">Bearbeiten</Link>
                    </div>
                    <div>
                        Klicke hier um deine Speisekarten und Preise zu bearbeiten.
                        <Link to="/menu">Bearbeiten</Link>
                    </div>
                    <div>
                        Klicke hier um deine Bestellungen in Echtzeit zu sehen.
                        <Link to="/orders">Weiter</Link>
                    </div>
                </div>
                <div>
                    <QRCode value={shopId} />
                </div>
            </div>
        );
    }
}

const styles = {
    container: {

    },
    menuContainer: {
        margin: isMobile ? 15 : "20px 30px 20px 30px",
        // flexDirection: "column",
        display: "flex",
    },

}