import React, { Component } from 'react';
import FormElement from "./FormElement";
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import { auth } from '../../Firebase';
import { isMobile } from "react-device-detect";

export default class LoginContainer extends Component {
    render() {
        const { tabKey, setKey, data, signInUpWithEmail, loginWithGoogle } = this.props;
        return (
            <div style={styles.container}>

                <Tab.Container
                    activeKey={tabKey}
                    onSelect={(k) => setKey(k)}>
                    <Row>
                        <Col>
                            <Nav justify variant="tabs" className="flex-row">
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
                                <div style={styles.formElementsContainer}>
                                    {
                                        Object.keys(data).map(key => (
                                            <Tab.Pane key={key} eventKey={key}>
                                                <FormElement signInUpWithEmail={signInUpWithEmail.bind(this)} loginWithGoogle={loginWithGoogle.bind(this)} data={data[key]} />
                                            </Tab.Pane>
                                        ))
                                    }
                                </div>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>

        );
    }
}

const styles = {
    container: {
        backgroundColor: "white",
        // padding: 20,
        marginTop: 20,
        width: isMobile ? "100%" : "30%",
        boxShadow: "0px 0px 1px 0px",
        // backgroundColor: "red",
        minWidth: 400,
        // display: "flex",
        // flexShrink: 1,
        // width: "%"
    },
    formElementsContainer:{
        margin: "10px 20px 0px 20px"
    }

}
