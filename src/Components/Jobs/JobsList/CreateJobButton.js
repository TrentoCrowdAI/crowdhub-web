import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button, Modal, Row, Col, Card, Alert} from "react-bootstrap";

import Templates from '../CreateJob/Templates';
import './CreateJobButtons.css';

export default class CreateJobButton extends Component {

  state = {
    showModal: false
  };

  render() {
    return (
      <div>
        <SelectTemplateModal show={this.state.showModal} onCancel={() => this.setState({showModal: false})}/>

        <Button onClick={() => this.setState({showModal: true})}>New</Button>
      </div>
    );
  }
}


const SelectTemplateModal = ({show, onCancel}) => (
  <Modal show={show} size="lg">
    <Modal.Header>
      <Modal.Title>Create a new Job</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      You are creating a new Job. Select a template to start with:

      <Alert className="mt-1" variant="primary">
        <i className="fas fa-info-circle mr-2"/>
        You can always edit the job design and CSV variable names later.
      </Alert>

      <Row>
        {
          Object.keys(Templates).map(id => {
            const template = Templates[id];
            return (
              <Col xs="12" sm={6} xl={3} key={id} className="template-card">
                <Card>
                  <Card.Body>
                    <Card.Title>{template.name}</Card.Title>
                    <Card.Text>{template.description}</Card.Text>

                    <div className="select-template-button-container">
                      <Link to={`/jobs/new/${id}`} className="btn btn-primary">Choose</Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )
          })
        }
      </Row>

    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={onCancel}>Cancel</Button>
    </Modal.Footer>
  </Modal>
);
