import React, { Component } from 'react';
import FormElement from "../components/login/FormElement";
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import { googleProvider, auth } from '../Firebase';

const data = {
    signin: {
        inputs: {
            mail: {
                name: "E-Mail",
                controlId: "formBasicEmail",
                placeholder: "Email eingeben",
                type: "email",
            },
            password: {
                name: "Passwort",
                controlId: "formBasicPassword",
                placeholder: "Passwort eingeben",
                type: "password",
            }    
        }, 
        google: "Login mit Google",
        method: "Login",
    }, 
    signup: {
        inputs: {
            mail: {
                name: "E-Mail",
                controlId: "formBasicEmail",
                type: "email",
                placeholder: "Email eingeben"
            },
            password: {
                name: "Passwort",
                controlId: "formBasicPassword",
                type: "password",
                placeholder: "Passwort eingeben"
            }  
        },
        google: "Registrieren mit Google",
        method: "Registrieren",
    }
}

export default class Login extends Component {
    state = {
        key: Object.keys(data)[0]
    }

    async loginWithGoogle() {
        try {
            const result = await auth.signInWithPopup(googleProvider);
            const token = result.credential.accessToken;
            const user = result.user;

            if(user) {
                console.log(user)
            } else {
                alert("Bitte erneut versuchen!");
            }
        } catch (error) {
            alert("Bitte erneut versuchen!");
        }
    }

    signInUpWithEmail (email, password) {
        const { key } = this.state;
        if(key === "signup") {
            auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
                alert("Ungültige Daten. Bitte erneut versuchen.");
            });
        } else {
            auth.signInWithEmailAndPassword(email, password).catch(function(error) {
                alert("User existiert nicht oder Login Daten sind falsch.");
            });
        }
    }

    render() {
        const { key } = this.state;
        return (
            <Tab.Container       
                activeKey={key}
                onSelect={(k) => this.setState({key: k})}>
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
                                        <FormElement signInUpWithEmail={this.signInUpWithEmail.bind(this)} loginWithGoogle={this.loginWithGoogle.bind(this)} data={data[key]} />
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