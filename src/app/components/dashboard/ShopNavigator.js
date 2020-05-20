import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import QRCode from 'qrcode.react';
import { isMobile } from "react-device-detect";
import { MdArrowBack, MdShoppingCart, MdStore } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'


export default class ShopNavigator extends Component {
    render() {
        const { shopId } = this.props;
        return (
            <div>
                <Card style={styles.menuContainer}>
                    <Card.Body style={styles.menuContainer}>
                    <Link to="/info" style={styles.aCategory} className="shopContainerHover">
                        <div style={styles.imageContainer}>
                            <MdStore size={80} />
                        </div>
                        <div style={styles.titleText}>Betriebs-Info</div>
                    </Link>
                    <Link to="/menu" style={styles.aCategory} className="shopContainerHover">
                        <div style={styles.imageContainer}>
                            <FaEdit size={70} />
                        </div>
                        <div style={styles.titleText}>Speisekarten und Preise </div>
                    </Link>
                    <Link to="/orders" style={styles.aCategory} className="shopContainerHover">
                        <div style={styles.imageContainer}>
                            <MdShoppingCart size={80} />
                        </div>
                        <div style={styles.titleText}>Echtzeit-Bestellungen</div>
                    </Link>
                    </Card.Body>
                </Card>
                <Card style={styles.menuContainer}>
                    <Card.Body style={styles.tables}>
                        <div>
                            <p>Scanne deinen QR-Code um deinen Shop zu testen!</p>
                            <QRCode value={JSON.stringify({shopId, table: 0})} />
                        </div>
                        <div></div>
                        <div></div>
                    </Card.Body>
                </Card>
                <Card style={styles.menuContainer}>
                    <Card.Body style={styles.tables}>
                        <div>
                            <p>Tisch 1</p>
                            <QRCode value={JSON.stringify({shopId, table: 1})} />
                        </div>
                        <div>
                            <p>Tisch 2</p>
                            <QRCode value={JSON.stringify({shopId, table: 2})} />
                        </div>
                        <div>
                            <p>Tisch 3</p>
                            <QRCode value={JSON.stringify({shopId, table: 3})} />
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

const styles = {
    tables: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    container: {

    },
    menuContainer: {
        margin: isMobile ? 15 : "20px 30px 20px 30px",
        // flexDirection: "column",
        display: "flex",
        justifyContent: "center",
    },
    aCategory: {
        minWidth: 250,
        width: 250,
        height: 250,
        border: "1px solid lightgrey",
        cursor: "pointer",
        padding: 5,
        margin: 5,
        position: "relative",
        color: "black",
        textDecoration: 'none'
    },
    imageContainer: {
        width: "100%",
        height: 150,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    titleText: {
        // fontWeight: "bold",
        fontSize: 17,
        margin: 5
    },
}