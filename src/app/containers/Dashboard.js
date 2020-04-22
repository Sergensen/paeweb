import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { auth } from '../Firebase';

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
            </Container>
        ) : <div />;
    }
}


const styles = {
    container: {
    },
}