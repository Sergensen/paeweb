import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Product from './Product'

export default class ProductList extends Component {
    render() {
        const { products } = this.props;
        return (
            <Container>
                {Object.keys(products).map(i => {
                    const { name, price } = products[i];
                    return (
                        <Row key={i}>
                            <Col> {name} </Col>
                            <Col> {price} </Col>
                            <Col>
                                <Button>Bearbeiten</Button>
                            </Col>
                        </Row>
                    )
                })}
            </Container>
        );
    }
}