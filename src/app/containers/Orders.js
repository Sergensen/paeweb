import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { firestore } from '../Firebase';

export default class Info extends Component {
    state = {
        orders: null,
    }

    async componentDidMount() {
        const { user } = this.props;
        if(user && user.uid) {
            const userRef = firestore.collection("orders").doc(user.uid);
            try {
                const document = await userRef.get();
                if (document.exists) {
                    const orders = document.data();
                    this.setState({
                        orders
                    })
                }
            } catch (e) {
                console.log("Error getting document:", e);
            }
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