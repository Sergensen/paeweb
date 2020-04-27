import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { auth, firestore } from '../Firebase';
import FormElement from '../components/info/FormElement';

export default class Info extends Component {
    state = {
        shop: false,
        existing: false,
        uid: false,
        shopId: false
    }

    componentDidMount() {
        const shopId = window.location.pathname.split('/')[1] || "";
        this.setState({shopId});
    }

    componentDidUpdate() {
        const { uid } = this.state;
        if(!uid) {
            const user = auth.currentUser;
            if(user && user.uid) {
                this.setState({uid: user.uid});
                this.getShop();
            } else {
                //window.location.pathname =  "/login";
            }
        }
    }

    async getShop () {
        const { shopId } = this.state;
        console.log(shopId);

        if(shopId) {
            const shopRef = firestore.collection("shops").doc(shopId);
            const document = await shopRef.get();
            if (document.exists) {
                const shop = document.data();
                this.setState({
                    shop
                })
            }
        } else {
            //window.location.href = "/";
        }
    }

    save(name, description, backgroundColor) {
        const { existing, uid, shopId } = this.state;
        if(uid) {
            const shopRef = firestore.collection("shops").doc(shopId);
            shopRef.set({
                name, 
                description, 
                backgroundColor
            })
        }
    }

    render() {
        const { shop, shopId } = this.state;
        return (
            <Container>
                <Row>
                    <Link to={""}>Zurück</Link>
                </Row>
                <Row>
                    {shop && <FormElement save={this.save.bind(this)} shop={shop} />}
                </Row>
            </Container>
        );
    }
}

const styles = {
    container: {
    },
}