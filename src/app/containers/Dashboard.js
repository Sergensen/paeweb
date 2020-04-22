import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { auth } from '../Firebase';
import { Link } from "react-router-dom";

export default class Dashboard extends Component {
    async signOut () {
        await auth.signOut()
        document.location.href = "/login";
    }

    render() {
        const { user } = this.props;
        return user ? (
            <Container>
                <Row>
                    <Button onClick={() => this.signOut()}>
                        Ausloggen
                    </Button>
                </Row>
                <Row>
                    Guten Tag {user.displayName+"!" || "!"}
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
                </Row>
                <Row>
                    
                </Row>

            </Container>
        ) : <div />;
    }
}


const styles = {
    container: {
    },
}