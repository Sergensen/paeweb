import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';

export default class Info extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Link to="/">Zurück</Link>
                </Row>
                <Row>
                    Info
                </Row>
            </Container>
        );
    }
}

const styles = {
    container: {
    },
}