import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ProductList from './ProductList';
import ProductModal from './ProductModal';
import API from '../../Api';
import { MdArrowBack, MdCreate } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'

export default class Categories extends Component {
    state = {
        name: "",
        description: "",
        disabled: true,
        products: {},
        productModal: false,
        create: false
    }

    componentDidMount() {
        const { data, products } = this.props.category;
        const { name, description } = data;
        this.setState({
            name,
            description,
            products
        })
    }

    updateCategory() {
        const { updateCategory } = this.props;
        const { name, description, disabled } = this.state;

        this.setState({
            disabled: !disabled
        })

        if (name && description && !disabled) {
            updateCategory(name, description);
        }
    }

    toggleModal() {
        this.setState(prev => ({
            productModal: !prev.productModal
        }))
    }

    async deleteProduct(shopId, categoryId, productId) {
        const { products } = this.state;

        //delete products[productId];

        await API.deleteProduct(shopId, categoryId, productId)

        this.setState({ products })
    }

    render() {
        const { resetCategory } = this.props;
        const { name, description, disabled, products, productModal, create } = this.state;
        return (
            <div>
                <div style={styles.headerContainer}>
                    <Button style={{ margin: "10px 0 10px 0" }} onClick={() => resetCategory()}><MdArrowBack size={20} />Zurück</Button>
                    <div style={styles.welcomeTextContainer}>
                        <div style={styles.welcomeText}>{name}</div>
                    </div>
                </div>

            <Card>
                <Card.Body>
                <Container>

                    <div style={{ fontSize: 20, fontWeight: "bold" }}>Beschreibung:</div>


                    <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control disabled={disabled} value={name || ""} onChange={(e) => this.setState({ name: e.target.value })} type="text" placeholder="Burger" />
                                    <Form.Text>Gib hier den Namen der Kategorie ein. </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Beschreibung</Form.Label>
                                    <Form.Control disabled={disabled} value={description || ""} onChange={(e) => this.setState({ description: e.target.value })} type="text" placeholder="Die besten Burger der Stadt!" />
                                    <Form.Text>Beschreibe deine Kategorie mit einem aussagekräftigen Satz.</Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button onClick={() => this.updateCategory()}><MdCreate size={18}/> {disabled ? "Bearbeiten" : "Speichern"}</Button>
                    </Form>

                    <br />
                    <div style={{ fontSize: 20, fontWeight: "bold" }}>Produkte:</div>
                    <Row>
                        <Button style={{ margin: 10 }} onClick={() => this.setState({ productModal: true, create: true })}><FaPlus /> Produkt hinzufügen</Button>
                    </Row>
                    {products && (
                        <div style={styles.listContainer}>
                            {
                                Object.keys(products).length === 0 ? (
                                    "Diese Kategorie ist noch leer."
                                ) : (
                                        <ProductList deleteProduct={this.deleteProduct.bind(this)} products={products} />
                                    )
                            }
                        </div>)}
                    <ProductModal create={create} toggleModal={this.toggleModal.bind(this)} modal={productModal} />
                </Container>
                </Card.Body>
            </Card>
            </div>
        );
    }
}

const styles = {
    headerContainer: {
        // backgroundColor: "orange",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // height: 50,
        position: "relative"
    },
    welcomeTextContainer: {
        display: "flex",
        flex: 10,
        alignItems: "center",
        justifyContent: "center",
        margin: 10
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    listContainer: {
        marginTop: 15
    },
}