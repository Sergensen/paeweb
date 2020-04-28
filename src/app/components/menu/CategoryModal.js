import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default class CategoryModal extends Component {
    state = {
        name: "",
        description: ""
    }

    onChange(e, type) {
        this.setState({
            [type]: e.target.value
        })
    }

    async addCategory() {
        const { addCategory } = this.props;
        const { name, description } = this.state;
        await addCategory(name, description);
    }

    render() {
        const { toggleModal, modal } = this.props;
        const { name, description } = this.state;
        return (
            <Modal show={modal} onHide={() => toggleModal("categoryModal", false)}>  
                <Modal.Header closeButton>
                    <Modal.Title>Kategorie erstellen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={name || ""} onChange={(e) => this.onChange(e, "name")} type="text" placeholder="Burger" />
                            <Form.Text>Gib hier den Namen der neuen Kategorie ein. </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Beschreibung</Form.Label>
                            <Form.Control value={description || ""} onChange={(e) => this.onChange(e, "description")} type="text" placeholder="Die besten Burger der Stadt!" />
                            <Form.Text>Beschreibe deine Kategorie mit einem aussagekräftigen Satz.</Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => toggleModal("categoryModal", false)} variant="secondary">Abbrechen</Button>
                    <Button onClick={() => this.addCategory()} variant="primary">Erstellen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
