import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Product from './Product'
import ProductModal from './ProductModal'
import API from '../../Api';
import { MdCreate, MdDelete } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'

export default class ProductList extends Component {
    state = {
        productModal: false,
        selected: false
    }

    async toggleModal(i = false) {
        const { products } = this.props;
        await this.setState({ selected: (i ? i : false) })

        this.setState(prev => ({
            productModal: !prev.productModal,
        }))
    }

    delete(productId) {
        const { deleteProduct } = this.props;
        const shopId = API.getLocalShop();
        const categoryId = API.getLocalCategory();
        if (shopId && categoryId && productId && window.confirm("Möchten Sie das Produkt wirklich löschen?")) {
            deleteProduct(shopId, categoryId, productId);
        }
    }

    render() {
        const { products } = this.props;
        const { productModal, selected } = this.state;

        console.log(JSON.stringify(products))

        return (
            <Container>
                <Row>
                    <Col style={styles.descText}> Name </Col>
                    <Col style={styles.descText}> Preis in € </Col>
                    <Col style={styles.descText}> Beschreibung </Col>
                    <Col></Col>
                </Row>
                {Object.keys(products).map(i => {
                    const { name, price, description } = products[i];
                    return (
                        <Row key={i} style={styles.row}>
                            <Col> {name} </Col>
                            <Col> {price} </Col>
                            <Col> {description} </Col>
                            <Col>
                                <Button onClick={() => this.toggleModal(i)} style={styles.listButtons}><MdCreate size={20}/></Button>
                                <Button onClick={() => this.delete(i)} style={styles.listButtons}><MdDelete size={20}/></Button>
                            </Col>
                        </Row>
                    )
                })}
                {products[selected] && <ProductModal product={products[selected]} productId={selected} create={false} toggleModal={this.toggleModal.bind(this)} modal={productModal} />}
            </Container>
        );
    }
}

const styles={
    descText:{
        fontWeight: "bold",
        marginBottom: 5
    },
    row:{
        borderWidth: "0 0 1px 0 ",
        borderColor: "grey",
        borderStyle: "solid",
        marginTop: 10,
        padding: 5
    },
    listButtons:{
        margin: "0 10px 0 10px ",
        fontSize: 0,
        padding: "6px 9px 6px 9px",
        // backgroundColor: "red"
    }
}