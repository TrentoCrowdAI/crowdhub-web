import React, {Component} from 'react';
import {Col, Form, Row} from "react-bootstrap";

import BlockCard from "../BlockCard";
import {
  blockState,
  checkboxChangeHandler,
  selectChangeHandler,
  textBlurHandler,
  textChangeHandler,
  toggleExpansionHandler
} from "../utils";

const BLOCK_TYPE = 'output_open_question';

class OutputOpenQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = blockState(props, {
      question: props.data.question || '',
      csvVariable: props.data.csvVariable || '',
      required: props.data.required || false,
      size: props.data.size || 'slim'
    });
  }

  validate = () => this.state.csvVariable !== '' && this.state.question !== '';

  render() {
    return (
      <BlockCard onToggleExpansion={toggleExpansionHandler(this)} {...this.state}
                 title="Output Open Question" type={BLOCK_TYPE} expandable={this.props.expandable}>

        <Row>
          <Col md="12" lg="6">
            <Form.Group>
              <Form.Label>Question</Form.Label>
              <Form.Control name="question" type="text" value={this.state.question}
                            onChange={textChangeHandler(this)}
                            onBlur={textBlurHandler(this)}/>
            </Form.Group>
          </Col>
          <Col md="12" lg="6">
            <Form.Group>
              <Form.Label>CSV Variable</Form.Label>
              <Form.Control name="csvVariable" type="text" value={this.state.csvVariable}
                            onChange={textChangeHandler(this)}
                            onBlur={textBlurHandler(this)}/>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="12" lg="6">
            <Form.Group>
              <Form.Check type="checkbox" name="required" label="Required"
                          checked={this.state.required} onChange={checkboxChangeHandler(this)}/>
            </Form.Group>
          </Col>

          <Col md="12" lg="6">
            <Form.Group>
              <Form.Label>Text field size</Form.Label>
              <Form.Control as="select" name="size" onChange={selectChangeHandler(this)} value={this.state.size}>
                <option value="slim">Slim</option>
                <option value="big">Big</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

      </BlockCard>
    );
  }
}


export default {
  blockTypeName: BLOCK_TYPE,
  Component: OutputOpenQuestion
}
