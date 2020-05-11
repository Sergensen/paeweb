import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { firestore } from '../Firebase';
import API from '../Api';

export default class Info extends Component {
    state = {
        orders: null,
    }

    componentDidMount() {
        this.getOrders();
    }
    
    async getOrders() {
        const shopId = API.getLocalShop();
        if(shopId) {
            const orders = await API.getOrders(shopId);
            this.setState({orders})
        } else {
            document.location = "/";
        }
    }

    render() {
        const { user } = this.state;
        return (
            <Container>
                <Row>
                    <Link to="/">Zurück</Link>
                </Row>
                <Row>
                    Bestellungen
                </Row>
            </Container>
        );
    }
}

const styles = {
    container: {
    },
}