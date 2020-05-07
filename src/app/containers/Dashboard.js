import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { auth, firestore } from '../Firebase';
import { Link } from "react-router-dom";
import ShopModal from '../components/dashboard/ShopModal';
import ShopNavigator from '../components/dashboard/ShopNavigator';
import API from '../Api';

export default class Dashboard extends Component {
    state = {
        shops: false,
        createShopModal: false,
        shopId: false
    }

    async signOut () {
        API.resetShop();
        API.resetCategory();
        await auth.signOut()
        document.location.href = "/login";
    }

    componentDidMount() {
        const shopId = API.getLocalShop();
        if(shopId) {
            this.setState({shopId})
        }
    }

    async componentDidUpdate() {
        const { shops, shopId } = this.state;
        const { user } = this.props;

        if(user && user.uid && !shopId && !shops) {
            await this.loadShops();
        }
    }

    async loadShops() {
        const { user } = this.props;
        const shops = await API.getShopsOfUser(user.uid)
        this.setState({shops});
    }

    setShop(shopId) {
        API.setLocalShop(shopId);
        this.setState({
            shopId,
            createShopModal: false
        });
    }

    async resetShop() {
        const { shops } = this.state;
        API.resetShop();
        API.resetCategory();
        this.setState({shopId: false});
        await this.loadShops(); 
    }

    async deleteShop(shopId) {
        const { shops } = this.state;
        delete shops[shopId];

        if(shopId && window.confirm("Möchten Sie den Shop wirklich löschen?")) 
            await API.deleteShop(shopId);

        this.setState({shops})
    }


    toggleModal(type, value) {
        this.setState({[type]: value})
    }

    async createShop(shop) {
        const { user } = this.props;
        if(user && shop) {
            const { name, description, backgroundColor } = shop;
            const shopId = API.createUniqueId();
            await API.addShopToUser(shopId, user.uid)
            await API.addShop(shopId, name, description, backgroundColor)
            this.setShop(shopId)
        }
    }

    render() {
        const { user } = this.props;
        const { shops, shopId, createShopModal } = this.state;
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
                {shopId ? (
                    <ShopNavigator shopId={shopId} resetShop={this.resetShop.bind(this)} />
                ) : (
                    <Container>
                        <Row>
                            {shops ? "Wählen Sie den Store, den Sie bearbeiten möchten." : "Sie besitzen noch keinen Shop"}
                        </Row>
                        {(shops.length > 0) && shops.map(({name, shopId}) => (
                            <Row  key={shopId}>
                                <Button onClick={() => this.setShop(shopId)}>{name}</Button>
                                <Button onClick={() => this.deleteShop(shopId)}>Löschen</Button>
                            </Row>
                        ))}
                        <Row>
                            
                            <Button onClick={() => this.toggleModal("createShopModal" ,true)}>Neuen Shop erstellen</Button>
                            <ShopModal createShop={this.createShop.bind(this)} modal={createShopModal} toggleModal={this.toggleModal.bind(this)} />
                        </Row>
                    </Container>
                )}
            </Container>
        ) : <div />;
    }
}

