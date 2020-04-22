import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { firestore } from '../Firebase';
import FormElement from '../components/info/FormElement';

export default class Info extends Component {
    state = {
        user: null,
        existing: false
    }

    async componentDidMount() {
        const { user } = this.props;
        if(user && user.uid) {
            const userRef = firestore.collection("users").doc(user.uid);
            try {
                const document = await userRef.get();
                if (document.exists) {
                    const user = document.data();
                    this.setState({
                        user
                    })
                }
            } catch (e) {
                console.log("Error getting document:", e);
            }
        }
    }

    save(name, description, backgroundColor) {
        const { user } = this.props;
        const { existing } = this.state;
        if(user.uid) {
            const userRef = firestore.collection("users").doc(user.uid);
            userRef.set({
                name, 
                description, 
                backgroundColor
            })
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
                    <FormElement save={this.save.bind(this)} user={user} />
                </Row>
            </Container>
        );
    }
}

const styles = {
    container: {
    },
}