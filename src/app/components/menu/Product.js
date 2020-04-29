import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

export default class Product extends Component {
    render() {
        const { name, description, price } = this.props;

        return (
            <Row>
                <Col>
                    {name}
                </Col>
                <Col>
                    {price}
                </Col>
                <Row>
                    <Col>
                        <Button>Bearbeiten</Button>
                    </Col>
                    <Col>
                        <Button>Extras</Button>
                    </Col>
                    <Col>
                        <Button>Pflichtangaben</Button>
                    </Col>
                </Row>
            </Row>
        );
    }
}