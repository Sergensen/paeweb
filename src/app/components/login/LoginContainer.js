import React, { Component } from 'react';
import FormElement from "./FormElement";
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import { googleProvider, auth } from '../../Firebase';

export default class LoginContainer extends Component {
    render() {
        const { tabKey, setKey, data, signInUpWithEmail, loginWithGoogle } = this.props;
        return (
            <Tab.Container       
                activeKey={tabKey}
                onSelect={(k) => setKey(k)}>
                <Row>
                    <Col>
                        <Nav variant="pills" className="flex-row">
                            {
                                Object.keys(data).map(key => (
                                    <Nav.Item key={key}>
                                        <Nav.Link eventKey={key}>{data[key].method}</Nav.Link>
                                    </Nav.Item>
                                ))
                            }
                        </Nav>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Tab.Content>
                            {
                                Object.keys(data).map(key => (
                                    <Tab.Pane key={key} eventKey={key}>
                                        <FormElement signInUpWithEmail={signInUpWithEmail.bind(this)} loginWithGoogle={loginWithGoogle.bind(this)} data={data[key]} />
                                    </Tab.Pane>
                                ))
                            }
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}

const styles = {
    container: {
    },
}