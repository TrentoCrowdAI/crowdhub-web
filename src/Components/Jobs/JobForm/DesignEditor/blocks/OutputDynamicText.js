import React, {Component} from 'react';
import {Card, Form} from "react-bootstrap";

export default class OutputDynamicText extends Component {


  render() {
    return (
      <Card bg="info" text="white" >
        <Card.Header>Output Dynamic Text</Card.Header>

        {
          this.props.expanded &&
          <Card.Body>

            <Form.Group>
              <Form.Label>CSV Variable</Form.Label>
              <Form.Control name="name" type="text"/>
            </Form.Group>

          </Card.Body>
        }

      </Card>
    )
  }
}