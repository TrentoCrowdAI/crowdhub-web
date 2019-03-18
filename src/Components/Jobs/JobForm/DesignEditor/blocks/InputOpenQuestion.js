import React, {Component} from 'react';
import {Card, Form} from "react-bootstrap";

export default class InputOpenQuestion extends Component {


  render () {
    return (
      <Card bg="dark" text="white">
        <Card.Header>Input Open Question</Card.Header>

        {
          this.props.expanded &&
          <Card.Body>
            <Form.Group>
              <Form.Label>Question</Form.Label>
              <Form.Control name="name" type="text"/>
            </Form.Group>

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
