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

        const filteredExtras = extras.filter(extra => extra.name !== "");

        await API.addProduct(shopId, categoryId, name, description, price, filteredExtras);
        window.location.reload()
    }
    
    async componentDidUpdate() {
        const shopId = API.getLocalShop();
        const categoryId = API.getLocalCategory();
        const { create, product, productId } = this.props;
        if(!create && product) {
            const { name, description, price } = product;
            if(name && !this.state.name) {
                const extras = await API.getExtrasOfProduct(shopId, categoryId, productId);
                this.setState({
                    name, description, price, extras
                })
            }
        }
    }

    componentDidMount() {
        this.setState({
            name: "",
            description: "",
            price: "",
            extras: [],
        })
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

    async loadExtras() {
        let { extras } = this.state;
        const shopId = API.getLocalShop();
        const categoryId = API.getLocalCategory();
        const newExtras = await API.getExtrasOfCategory(shopId, categoryId);
        extras = extras.concat(newExtras);
        this.setState({extras})
    }

    render() {
        const { toggleModal, modal, create, product } = this.props;
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
                                Extras hinzufügen
                            </Col>
                            <Col>
                                <Button onClick={() => this.addExtra()} variant="primary" size="sm">
                                    Neue
                                </Button> {' '}
                                <Button onClick={() => this.loadExtras()} variant="primary" size="sm">
                                    Bestehende
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
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => toggleModal()} variant="secondary">Abbrechen</Button>
                    <Button onClick={() => this.addProduct()} variant="primary">{create ? "Erstellen" : "Speichern"}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
