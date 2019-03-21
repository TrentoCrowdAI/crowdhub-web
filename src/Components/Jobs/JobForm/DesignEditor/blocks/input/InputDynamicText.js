import React, {Component} from 'react';
import {Card, Form} from "react-bootstrap";

const BLOCK_TYPE = 'input_dynamic_component';

class InputDynamicText extends Component {

  constructor (props) {
    super(props);
    this.state = {
      csvVariable: props.data.csvVariable
    }
  }

  handleChange = (e) => {
   this.setState({csvVariable: 'ok'})
  };

  render() {
    return (
      <Card bg="dark block-card" text="white" data-block-type={BLOCK_TYPE} data-block-id={this.props.data.id}>
        <Card.Header>Input Open Question</Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>CSV Variable</Form.Label>
            <Form.Control name="name" type="text" value={this.state.csvVariable} onChange={this.handleChange}/>
          </Form.Group>
        </Card.Body>
      </Card>
    );
  }
}

export default {
  blockTypeName: BLOCK_TYPE,
  Component: InputDynamicText
}
