import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default class ShopNavigator extends Component {
    state = {
        name: "",
        description: "",
        disabled: true
    }

    componentDidMount() {
        const { name, description } = this.props.category.data;
        this.setState({
            name, description
        })
    }

    onChange(type, value) {
        this.setState({
            [type]: value
        })
    }

    updateCategory() {
        const { updateCategory } = this.props;
        const { name, description } = this.state;
        if(name && description) {
            updateCategory(name, description);
            this.onChange("disabled", true)
        }
    }

    render() {
        const { resetCategory } = this.props;
        const { name, description, disabled } = this.state;
        return (
            <Container>
                <Row>
                    <Button onClick={() => resetCategory()}>Zurück</Button>
                </Row>
                <Row>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control disabled={disabled} value={name || ""} onChange={(e) => this.onChange("name", e.target.value)} type="text" placeholder="Burger" />
                            <Form.Text>Gib hier den Namen der neuen Kategorie ein. </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Beschreibung</Form.Label>
                            <Form.Control disabled={disabled} value={description || ""} onChange={(e) => this.onChange("description", e.target.value)} type="text" placeholder="Die besten Burger der Stadt!" />
                            <Form.Text>Beschreibe deine Kategorie mit einem aussagekräftigen Satz.</Form.Text>
                        </Form.Group>
                        <Button onClick={() => disabled ? this.onChange("disabled", false) : this.updateCategory()}>{disabled ? "Bearbeiten" : "Speichern"}</Button>
                    </Form>
                </Row>
            </Container>
        );
    }
}