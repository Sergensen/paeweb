import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, Image } from 'react-bootstrap';
import { SketchPicker } from 'react-color'

export default class FormElement extends Component {
    state = {
    }

    onChange(e, type) {
        let { user } = this.state;
        user[type] = e.target.value;
        this.setState({user})
    }

    componentDidUpdate() {
        if(!this.state.user) {
            const { user } = this.props;
            this.setState({user});
        }
    }

    save() {
        const { name, description, backgroundColor } = this.state.user;

        if(name !== "" && description !== "" && backgroundColor !== "") {
            this.props.save(name, description, backgroundColor);
        } else {
            alert("Bitte füllen Sie alles aus.");
        }
    }
    
    handleChangeComplete(color) {
        let { user } = this.state;
        user.backgroundColor = color.hex;
        this.setState({user})
    }

    render() {
        const { user } = this.state;
        return (
            <Container>
                <Row>
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
                </Row>
                <Row>
                    <Button onClick={() => this.save()}>Speichern</Button>
                </Row>
            </Container>
        );
    }
}


const styles = {
    container: {
    },
}