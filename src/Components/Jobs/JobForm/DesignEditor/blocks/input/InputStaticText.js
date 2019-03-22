import React, {Component} from 'react';
import {Card, Form} from "react-bootstrap";

const BLOCK_TYPE = 'input_static_component';

class InputStaticText extends Component {

  constructor (props) {
    super(props);
    this.state = {
      csvVariable: props.data.csvVariable
    }
  }

  render() {
    return (
      <Card bg="dark block-card" text="white" data-block-type={BLOCK_TYPE} data-block-id={this.props.data.id}>
        <Card.Header>Input Static Text</Card.Header>
        <Card.Body>

        </Card.Body>
      </Card>
    );
  }
}

export default {
  blockTypeName: BLOCK_TYPE,
  Component: InputStaticText
}
