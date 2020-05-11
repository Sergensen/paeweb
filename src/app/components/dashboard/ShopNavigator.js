import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
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
                <div style={styles.menuContainer}>
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
                </div>
                <div>
                    Was das hier? -> {" "}
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