import React, { Component } from 'react';
import { Button, Form, Modal, Container, Row, Col } from 'react-bootstrap';
import API from '../../Api';

export default class ExtraModal extends Component {
    state = {
    }

    render() {
        const { toggleModal, modal, addExtras, product } = this.props;
        const { productId, productName } = product;

        return (
            <Modal show={modal} onHide={() => toggleModal()}>  
                <Modal.Header closeButton>
                    <Modal.Title>{"Extras bearbeiten für: " + productName)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Label>Name</Form.Label>
                        </Col>
                        <Col>
                            <Form.Label>Preis</Form.Label>
                        </Col>
                    </Row>}

                    {extras.length>0 && extras.map((extra, i) => (
                        <Row key={i}>
                            <Col>
                                <Form.Control value={extra.name || ""} onChange={(e) => this.changeExtra(i, "name", e.target.value)} type="text" placeholder="Käse" />
                            </Col>
                            <Col>
                                <Form.Control value={extra.price || ""} onChange={(e) => this.changeExtra(i, "price", e.target.value)} type="text" placeholder="0,50" />
                            </Col>
                            <Col>
                                <Button onClick={() => this.deleteExtra(i)} variant="primary" size="sm">
                                    Löschen
                                </Button>           
                            </Col>
                        </Row>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => toggleModal()} variant="secondary">Abbrechen</Button>
                    <Button onClick={() => this.addProduct()} variant="primary">Erstellen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
