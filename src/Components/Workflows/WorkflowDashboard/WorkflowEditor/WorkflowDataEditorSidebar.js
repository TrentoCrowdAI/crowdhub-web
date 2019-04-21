import React, {Component} from 'react';
import {Col, Form, Row} from "react-bootstrap";

// TODO: Rename to parameters
export default class WorkflowDataEditorSidebar extends Component {



  render() {
    return (
      <div>
        <Row>
          <Col>
            <h5>Workflow properties</h5>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text"/>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" type="text" as="textarea"/>
            </Form.Group>
          </Col>
        </Row>
      </div>
    );
  }
}
