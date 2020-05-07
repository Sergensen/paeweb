import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import googleImage from '../../res/icons/g-logo.png';

export default class FormElement extends Component {
    state = {
        mail: "",
        password: ""
    }

    onKeyUp(e, type) {
        if (e.key === "Enter") this.signInOrUp();

        this.setState({
            [type]: e.target.value
        })
    }

    signInOrUp() {
        const { signInUpWithEmail } = this.props;
        const { mail, password } = this.state;

        signInUpWithEmail(mail, password);
    }

    render() {
        const { inputs, google, method } = this.props.data;

        return (
            <Container>
                <Row>
                    <Form style={{width: "100%"}}>
                        {
                            Object.keys(inputs).map(key => (
                                <Form.Group key={key} controlId={inputs[key].controlId}>
                                    {/* <Form.Label>{inputs[key].name}</Form.Label> */}
                                    <Form.Control onKeyUp={(e) => this.onKeyUp(e, key)} type={inputs[key].type} placeholder={inputs[key].placeholder} />
                                </Form.Group>
                            ))
                        }
                    </Form>
                </Row>
                <Row>
                    <Button style={{...element, ...text}} onClick={() => this.signInOrUp()}>{method}</Button>
                </Row>
                <Row>
                    <div style={styles.googleContainer}>
                        <div style={styles.googleIcon}>
                            <img src={googleImage} style={styles.googleImage} />
                        </div>
                        <Button style={styles.googleButton} onClick={this.props.loginWithGoogle.bind(this)}>
                            {google}
                        </Button>

                    </div>
                </Row>
            </Container>
        );
    }
}

const element = {
    width: "100%",
    margin: "0px 0px 10px 0px",
}

const text = {
    fontWeight: "bold"
}

const styles = {
    googleContainer: {
        display: "flex",
        flex: 1,
    },
    googleButton: {
        // ...element,
        ...text,    
        // backgroundColor: "#4285F4",
        flex: 1,
        borderRadius: "0px .25rem .25rem 0px",
    },
    googleIcon: {
        width: 38,
        height: 38,
        borderColor: "#4285F4",
        borderWidth: 1,
        borderStyle: "solid",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: ".25rem 0px 0px .25rem",

    },
    googleImage:{
        width: 18,
        height: 18,
    }

}