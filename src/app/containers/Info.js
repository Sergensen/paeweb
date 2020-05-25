import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { auth, firestore } from '../Firebase';
import FormElement from '../components/info/FormElement';
import API from '../Api';

export default class Info extends Component {
    state = {
        shopId: false,
        shop: false
    }

    componentDidMount() {
        const shopId = API.getLocalShop();
        if (shopId) {
            this.setState({ shopId })
        }
    }

    async componentDidUpdate() {
        const { shopId, shop } = this.state;
        const { user } = this.props;

        if (user && user.uid && shopId && !shop) {
            const fetchedShop = await API.getShop(shopId);
            if (fetchedShop) {
                this.setState({ shop: fetchedShop });
            } else {
                document.location = "/";
            }
        } else if (user && user.uid && !shopId) {
            document.location = "/";
        }
    }

    async save(name, description, backgroundColor) {
        const { shopId } = this.state;
        if (shopId, name, description, backgroundColor) {
            await API.updateShop(shopId, name, description, backgroundColor);
            window.location.reload();
        }
    }

    render() {
        const { shop, shopId } = this.state;
        return (
            <Container>
                <Row>
                    <Button><Link to={""} style={{ color: "white", flex: 1, justifyContent: "center", alignItems: "center", display: "flex" }}>Zurück</Link></Button>
                </Row>
                <Row>
                    {shop && <FormElement shopId={shopId} save={this.save.bind(this)} shop={shop} />}
                </Row>
            </Container>
        );
    }
}

