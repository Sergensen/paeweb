import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import QRCode from 'qrcode.react';

export default class ShopNavigator extends Component {
    render() {
        const { resetShop, shopId } = this.props;
        return (
            <Container>
                <Row>
                    <Button onClick={() => resetShop()}>Shop wechseln</Button>
                </Row>
                <Row>
                    <Col>
                        Klicke hier um deine Betriebs-Info zu bearbeiten.
                        <Link to="/info">Bearbeiten</Link>
                    </Col>
                    <Col>
                        Klicke hier um deine Speisekarten und Preise zu bearbeiten.
                        <Link to="/menu">Bearbeiten</Link>
                    </Col>
                    <Col>
                        Klicke hier um deine Bestellungen in Echtzeit zu sehen.
                        <Link to="/orders">Weiter</Link>
                    </Col>
                </Row>
                <Row>
                    <QRCode value={shopId} />
                </Row>
            </Container>
        );
    }
}