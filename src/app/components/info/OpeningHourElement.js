import React, { Component } from 'react';
import FormElement from "./FormElement";
import { Container, Row, Col, Nav, Form } from 'react-bootstrap';
import { auth } from '../../Firebase';

export default class OpeningHourElement extends Component {

    onChange(value, type) {
        const { day, onChange } = this.props;
        onChange(day, type, value);
    } 

    render() {
        const { day, data, showErrors } = this.props;
        const { from, to, name, open, validFrom, validTo } = data;

        return (
            <Form.Group>
                <Form.Label>{name}</Form.Label> {" "}
                <Form.Check checked={open} onChange={(e) => this.onChange(e.target.checked, "open")} inline label="Geöffnet" type="checkbox" />
                <Form.Text>Von</Form.Text>
                <Form.Control disabled={!open} isInvalid={open && !validFrom && showErrors} value={from} onChange={(e) => this.onChange(e.target.value, "from")} type="text" placeholder="8:00" />
                <Form.Text>Bis</Form.Text>
                <Form.Control disabled={!open} isInvalid={open && !validTo && showErrors} value={to} onChange={(e) => this.onChange(e.target.value, "to")} type="text" placeholder="17:30" />
            </Form.Group>
        );
    }
}
