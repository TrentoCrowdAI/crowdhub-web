import React, {Component} from 'react';
import {Card, Collapse, Form, Row, Col} from "react-bootstrap";
import BlockComponent from "../BlockComponent";

const BLOCK_TYPE = 'input_dynamic_text';

const valueOrDefaultIfStringEmptyOrNull = (value, defaultValue) => (value && value.length > 0) ? value : defaultValue;

class InputDynamicText extends BlockComponent {

  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      ...this.state,

      csvVariable: valueOrDefaultIfStringEmptyOrNull(props.data.csvVariable, 'text_column_name'),
      csvTitleVariable: valueOrDefaultIfStringEmptyOrNull(props.data.csvTitleVariable, 'title_column_name'),
      highlightable: props.data.highlightable || false,
      question: props.data.question || '',
      highlightedCsvVariable: valueOrDefaultIfStringEmptyOrNull(props.data.highlightedCsvVariable, 'highlighted_column_name')
    }
    console.log(this.state)
  }

  onChangeHighlightable = (e) => this.setState(
    {highlightable: e.target.checked},
    () => this.props.onChange(this.state)
  );

  render() {
    return (
      <Card bg="dark block-card" text="white" data-block-type={BLOCK_TYPE} data-block-id={this.props.data.id}>
        <Card.Header>
          Input Dynamic Text
        </Card.Header>
        <Collapse in={this.state.expanded}>
          <div>
            <Card.Body>
              <Row>
                <Col md="12" lg="6">
                  <Form.Group>
                    <Form.Label>CSV Title Variable</Form.Label>
                    <Form.Control name="csvTitleVariable" type="text" value={this.state.csvTitleVariable}
                                  onChange={this.handleTextChange}
                                  onBlur={this.handleTextBlur}/>
                  </Form.Group>
                </Col>
                <Col md="12" lg="6">
                  <Form.Group>
                    <Form.Label>CSV Variable</Form.Label>
                    <Form.Control name="csvVariable" type="text" value={this.state.csvVariable}
                                  onChange={this.handleTextChange}
                                  onBlur={this.handleTextBlur}/>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group>
                <Form.Check type="checkbox" name="highlightable" label="Enable text highlighting"
                            checked={this.state.highlightable} onChange={this.onChangeHighlightable}/>
              </Form.Group>

              {
                this.state.highlightable &&
                <Row>
                  <Col md="12" lg="6">
                    <Form.Group>
                      <Form.Label>Question</Form.Label>
                      <Form.Control name="question" type="text" value={this.state.question}
                                    onChange={this.handleTextChange}
                                    onBlur={this.handleTextBlur}/>
                    </Form.Group>
                  </Col>
                  <Col md="12" lg="6">
                    <Form.Group>
                      <Form.Label>Highlighted CSV Variable</Form.Label>
                      <Form.Control name="highlightedCsvVariable" type="text" value={this.state.highlightedCsvVariable}
                                    onChange={this.handleTextChange}
                                    onBlur={this.handleTextBlur}/>
                    </Form.Group>
                  </Col>
                </Row>
              }

            </Card.Body>
          </div>
        </Collapse>
      </Card>
    );
  }
}

export default {
  blockTypeName: BLOCK_TYPE,
  Component: InputDynamicText
}
