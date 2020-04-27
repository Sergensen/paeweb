import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { firestore } from '../Firebase';

export default class Menu extends Component {
    state = {}
    
     async componentDidMount() {
        const { user } = this.props;
        if(user && user.uid) {
            const userRef = firestore.collection("menu").doc(user.uid);
            try {
                const document = await userRef.get();
                if (document.exists) {
                    const menu = document.data();
                    this.setState({
                        menu
                    })
                } 
            } catch (e) {
                console.log("Error getting document:", e);
            }
        }
    }

    render() {
        const { menu } = this.state;
        return (
            <Container>
                <Row>
                    <Link to="/">Zurück</Link>
                </Row>
                {!menu && (<Row>
                    Deine Speisekarte ist noch Leer.
                </Row>)}
                <Row>
                    <Button>Kategorie hinzufügen</Button>
                </Row>
            </Container>
        );
    }   
}


const styles = {
    container: {
    },
}