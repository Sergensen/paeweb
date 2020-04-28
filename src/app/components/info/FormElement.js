import React, { Component } from 'react';
import { Container, Row, Button, Form } from 'react-bootstrap';
import { SketchPicker } from 'react-color'
import OpeningHoursModal from './OpeningHoursModal';
export default class FormElement extends Component {
    state = {
        openingHours: false,
    }

    onChange(e, type) {
        let { shop } = this.state;
        shop[type] = e.target.value;
        this.setState({shop})
    }

    componentDidMount() {
        const { shop } = this.props;
        this.setState({
            shop
        });
    }

    save() {
        const { name, description, backgroundColor } = this.state.shop;

        if(name !== "" && description !== "" && backgroundColor !== "") {
            this.props.save(name, description, backgroundColor);
        } else {
            alert("Bitte füllen Sie alles aus.");
        }
    }
    
    handleChangeComplete(color) {
        let { shop } = this.state;
        shop.backgroundColor = color.hex;
        this.setState({shop})
    }

    toggleModal(type, value) {
        this.setState({
            [type]: value
        })
    }

    render() {
        const { shop, openingHours } = this.state;
        return (
            <Container>
                <Row>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={shop && shop.name || ""} onChange={(e) => this.onChange(e, "name")} type="text" placeholder="Name deines Lokals" />
                            <Form.Text>Gib hier den Namen deines Lokals ein. </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Beschreibung</Form.Label>
                            <Form.Control value={shop && shop.description || ""} onChange={(e) => this.onChange(e, "description")} type="text" placeholder="Beschreibung deines Lokals" />
                            <Form.Text>Beschreibe dein Lokal mit einem aussagekräftigen Satz. </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Farbe</Form.Label>
                                <SketchPicker
                                    color={ shop && shop.backgroundColor || '#ffffff' }
                                    onChangeComplete={(color) => this.handleChangeComplete(color) }
                                />                            
                            <Form.Text>Wähle eine Farbe, die zu deinem Design gehört. </Form.Text>
                            <Button onClick={() => this.toggleModal("openingHours", true)}>Öffnungszeiten bearbeiten</Button>
                        </Form.Group>
                    </Form>
                </Row>
                <Row>
                    <Button onClick={() => this.save()}>Speichern</Button>
                </Row>
                <OpeningHoursModal {...this.props} openingHours={openingHours} toggleModal={this.toggleModal.bind(this)} />
            </Container>
        );
    }
}
