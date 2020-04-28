import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SketchPicker } from 'react-color'
import API from '../../Api';
import Constants from '../../Constants';
import OpeningHourElement from './OpeningHourElement';

export default class OpeningHoursModal extends Component {
    state = {
        days: {},
        showErrors: false
    }

    async componentDidMount() {
        const { shopId } = this.props;
        const openingHours = await API.getOpeningHours(shopId);

        if(Object.keys(openingHours).length) {
            this.setState({days: openingHours})
        } else {
            let init = {};
            for(let key in Constants.weekdays) {
                init[key] = {
                    from: "",
                    to: "",
                    open: false,
                    name: Constants.weekdays[key],
                    valid: false
                }
            }
            this.setState({days: init});
        }
    }

    validate() {
        const { days } = this.state;
        const weekdays = Object.keys(days);
        let abort = false;

        weekdays.forEach(key=> {
            days[key].validFrom = /^(2[0-3]|[0-1]?[\d]):[0-5][\d]$/.test(days[key].from); 
            days[key].validTo = /^(2[0-3]|[0-1]?[\d]):[0-5][\d]$/.test(days[key].to); 
            
            if(days[key].open && (!days[key].validFrom || !days[key].validTo)) {
                abort = true;
            } 
            this.setState({days, showErrors: true})
        })

        return abort;
    }

    onChange(key, type, value) {
        const {days} = this.state;
        days[key][type] = value;
        this.setState({ days })
    }

    async save () {
        const { toggleModal, shopId } = this.props;
        const { days } = this.state;
        const abort = this.validate();
        if(!abort) {
            await API.saveOpeningHours(shopId, days);
            toggleModal("openingHours", false)
        } else {
            alert("Bitte überprüfen Sie Ihre eingaben.")
        }
    }

    render() {
        const { toggleModal, openingHours } = this.props;
        const { days, showErrors } = this.state;
        const weekdays = Object.keys(days);
        return (
            <Modal show={openingHours} onHide={() => toggleModal("openingHours", false)}>  
                <Modal.Header closeButton>
                    <Modal.Title>Öffnungszeiten ändern</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        {
                            weekdays.map(key => 
                                <OpeningHourElement 
                                    key={key} 
                                    day={key} 
                                    data={days[key]} 
                                    onChange={this.onChange.bind(this)}
                                    showErrors={showErrors}
                                />
                            )
                        }
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => toggleModal("openingHours", false)} variant="secondary">Abbrechen</Button>
                    <Button onClick={() => this.save()} variant="primary">Speichern</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
