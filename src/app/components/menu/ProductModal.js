import React, { Component } from 'react';
import { Button, Form, Modal, Container, Row, Col } from 'react-bootstrap';
import API from '../../Api';

export default class ProductModal extends Component {
    state = {
        name: "",
        description: "",
        price: "",
        extras: [],
    }

    async addProduct() {
        const shopId = API.getLocalShop();
        const categoryId = API.getLocalCategory();
        const { addProduct, toggleModal } = this.props;
        const { name, description, price, extras } = this.state;
        await API.addProduct(shopId, categoryId, name, description, price, extras);
        window.location.reload()
    }

    changeExtra(i, type, value) {
        const { extras } = this.state;
        extras[i][type] = value;
        this.setState({extras})
    }

    addExtra() {
        let { extras } = this.state;
        extras.push({
            name: "",
            price: ""
        })
        this.setState({extras})
    }

    deleteExtra(i) {
        let { extras } = this.state;
        extras.splice(i, 1);
        this.setState({extras})
    }

    render() {
        const { toggleModal, modal, create } = this.props;
        const { name, description, price, extras } = this.state;
        return (
            <Modal show={modal} onHide={() => toggleModal()}>  
                <Modal.Header closeButton>
                    <Modal.Title>{"Produkt " + (create ? "erstellen" : "bearbeiten")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control value={name || ""} onChange={(e) => this.setState({name: e.target.value})} type="text" placeholder="Cheeseburger" />
                                    <Form.Text>Gib hier den Namen des Produkts ein. </Form.Text>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Beschreibung</Form.Label>
                                    <Form.Control value={description || ""} onChange={(e) => this.setState({description: e.target.value})} type="text" placeholder="Mit bestem Dry-Aged-Beef!" />
                                    <Form.Text>Beschreibe das Produkt.</Form.Text>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Preis</Form.Label>
                                    <Form.Control value={price || ""} onChange={(e) => this.setState({price: e.target.value})} type="text" placeholder="12,50" />
                                    <Form.Text>Preis des Produkts.</Form.Text>
                                </Form.Group>
                            </Form>
                        </Row>
                        <Row>
                            <Col>
                                Extras 
                            </Col>
                            <Col>
                                <Button onClick={() => this.addExtra()} variant="primary" size="sm">
                                    Extra Hinzufügen
                                </Button>
                            </Col>
                        </Row>

                        {extras.length>0 &&<Row>
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
                                    <Form.Control value={extra.name || ""} onChange={(e) => this.changeExtra(i, "name", e.target.value)} type="text" placeholder="Extra Käse" />
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
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => toggleModal()} variant="secondary">Abbrechen</Button>
                    <Button onClick={() => this.addProduct()} variant="primary">Erstellen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
