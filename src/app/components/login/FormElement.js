import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

export default class FormElement extends Component {
    state = {
        mail: "",
        password: ""
    }

    onKeyUp(e, type) {
        if(e.key === "Enter") this.signInOrUp();

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
                    <Form>
                        {
                            Object.keys(inputs).map(key => (
                                <Form.Group key={key} controlId={inputs[key].controlId}>
                                    <Form.Label>{inputs[key].name}</Form.Label>
                                    <Form.Control onKeyUp={(e) => this.onKeyUp(e, key)} type={inputs[key].type} placeholder={inputs[key].placeholder} />
                                </Form.Group>
                            ))
                        }
                    </Form>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => this.signInOrUp()}>{method}</Button>
                    </Col>
                    <Col>
                        <Button onClick={this.props.loginWithGoogle.bind(this)}>
                           {google}
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}