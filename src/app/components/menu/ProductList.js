import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Product from './Product'
import ProductModal from './ProductModal'
import API from '../../Api';

export default class ProductList extends Component {
    state = {
        productModal: false,
        selected: false
    }

    toggleModal(i = false) {
        const { products } = this.props;

        this.setState(prev => ({
            productModal: !prev.productModal,
            selected: (i ? i : false)
        }))
    }

    delete(productId) {
        const { deleteProduct } = this.props;
        const shopId = API.getLocalShop();
        const categoryId = API.getLocalCategory();
        if(shopId && categoryId && productId) {
            deleteProduct(shopId, categoryId, productId);
        } 
    }

    render() {
        const { products } = this.props;
        const { productModal, selected } = this.state;
        return (
            <Container>
                {Object.keys(products).map(i => {
                    const { name, price } = products[i];
                    return (
                        <Row key={i}>
                            <Col> {name} </Col>
                            <Col> {price} </Col>
                            <Col>
                                <Button onClick={() => this.toggleModal(i)}>Bearbeiten</Button>
                                {/* todo <Button onClick={() => this.delete(i)}>Löschen</Button> */}
                            </Col>
                        </Row>
                    )
                })}
                <ProductModal product={products[selected]} productId={selected} create={false} toggleModal={this.toggleModal.bind(this)} modal={productModal} />
            </Container>
        );
    }
}