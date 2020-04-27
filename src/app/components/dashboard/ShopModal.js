import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SketchPicker } from 'react-color'

export default class ShopModal extends Component {
    state = {
        user: {}
    }

    onChange(e, type) {
        let { user } = this.state;
        user[type] = e.target.value;
        this.setState({user})
    }
    
    handleChangeComplete(color) {
        let { user } = this.state;
        user.backgroundColor = color.hex;
        this.setState({user})
    }

    async createShop() {
        const { createShop } = this.props;
        const { user } = this.state;
        createShop(user);
    }

    render() {
        const { toggleModal, modal } = this.props;
        const { user } = this.state;
        return (
            <Modal show={modal} onHide={() => toggleModal("createShopModal", false)}>  
                <Modal.Header closeButton>
                    <Modal.Title>Shop erstellen</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={user && user.name || ""} onChange={(e) => this.onChange(e, "name")} type="text" placeholder="Name deines Lokals" />
                            <Form.Text>Gib hier den Namen deines Lokals ein. </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Beschreibung</Form.Label>
                            <Form.Control value={user && user.description || ""} onChange={(e) => this.onChange(e, "description")} type="text" placeholder="Beschreibung deines Lokals" />
                            <Form.Text>Beschreibe dein Lokal mit einem aussagekräftigen Satz. </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Farbe</Form.Label>
                                <SketchPicker
                                    color={ user && user.backgroundColor || '#ffffff' }
                                    onChangeComplete={(color) => this.handleChangeComplete(color) }
                                />                            
                            <Form.Text>Wähle eine Farbe, die zu deinem Design gehört. </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => toggleModal(false)} variant="secondary">Abbrechen</Button>
                    <Button onClick={() => this.createShop()} variant="primary">Erstellen</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
