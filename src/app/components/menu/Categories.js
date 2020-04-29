import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ProductList from './ProductList';
import ProductModal from './ProductModal';

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

        if(name && description && !disabled) {
            updateCategory(name, description);
        }
    }

    toggleModal() {
        this.setState(prev => ({
            productModal: !prev.productModal
        }))
    }

    render() {
        const { resetCategory } = this.props;
        const { name, description, disabled, products, productModal, create } = this.state;
        return (
            <Container>
                <Row>
                    <Button onClick={() => resetCategory()}>Zurück</Button>
                </Row>
                <Row>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control disabled={disabled} value={name || ""} onChange={(e) => this.setState({name: e.target.value})} type="text" placeholder="Burger" />
                            <Form.Text>Gib hier den Namen der Kategorie ein. </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Beschreibung</Form.Label>
                            <Form.Control disabled={disabled} value={description || ""} onChange={(e) => this.setState({description: e.target.value})} type="text" placeholder="Die besten Burger der Stadt!" />
                            <Form.Text>Beschreibe deine Kategorie mit einem aussagekräftigen Satz.</Form.Text>
                        </Form.Group>
                        <Button onClick={() => this.updateCategory()}>{disabled ? "Bearbeiten" : "Speichern"}</Button>
                    </Form>
                </Row>
                <br />
                <Row>
                    <Button onClick={() => this.setState({ productModal: true, create: true})}>Produkt hinzufügen</Button>
                </Row>
                {products && (<Row>
                    {
                        Object.keys(products).length === 0 ? (
                            "Diese Kategorie ist noch leer."
                        ) : (
                            <ProductList products={products} />
                        )
                    }
                </Row>)}
                <ProductModal create={create} toggleModal={this.toggleModal.bind(this)} modal={productModal} />
            </Container>
        );
    }
}