import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { auth, firestore } from '../Firebase';
import { Link } from "react-router-dom";
import ShopModal from '../components/dashboard/ShopModal';

export default class Dashboard extends Component {
    state = {
        shops: false,
        modal: false
    }

    async signOut () {
        await auth.signOut()
        document.location.href = "/login";
    }

    async componentDidUpdate() {
        const { shops } = this.state;
        const { user, selectShop } = this.props;
        if(!shops && user && user.uid) {
            const snap = await firestore.collection("users").doc(user.uid).collection("shops").get();
            let shops = [];
            snap.forEach(doc => {
                shops.push(doc.data());
                this.setState({shops});
            });
        }
    }

    create_UUID() {
        let dt = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    toggleModal(modal) {
        this.setState({modal})
    }

    async createShop(shop) {
        const { user } = this.props;
        const { name, description, backgroundColor } = shop;
        if(user && name && description && backgroundColor) {
            const id = this.create_UUID();
            await firestore.collection("users").doc(user.uid).collection("shops").doc(id).set({name, id});
            await firestore.collection("shops").doc(id).set(shop);
            this.toggleModal(false);
            window.location.reload();
        } else {
            alert("Bitte füllen Sie alle Felder aus.")
        }
    }

    render() {
        const { user, shop } = this.props;
        const { shops, modal } = this.state;
        return user ? (
            <Container>
                <Row>
                    <Button onClick={() => this.signOut()}>
                        Ausloggen
                    </Button>
                </Row>
                <Row>
                    Guten Tag {user.displayName+"!" || "!"}
                </Row>
                <Row>
                    {shops ? "Wählen Sie den Store, den Sie bearbeiten möchten." : "Sie besitzen noch keinen Shop"}
                </Row>
                {shops && <Row>
                    {
                        shops.map(shop => (
                            <Col key={shop.id}>
                                <Link to={"/" + shop.id}>{shop.name}</Link>
                            </Col>
                        ))
                    }
                </Row>}
                <Row>
                    <Button onClick={() => this.toggleModal(true)}>Shop erstellen</Button>
                    <ShopModal createShop={this.createShop.bind(this)} modal={modal} toggleModal={this.toggleModal.bind(this)} />
                </Row>
            </Container>
        ) : <div />;
    }
}


const styles = {
    container: {
    },
}