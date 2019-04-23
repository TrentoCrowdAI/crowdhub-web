import React, {Component} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import BlockCard from "../BlockCard";
import {blockState, textBlurHandler, textChangeHandler, toggleExpansionHandler} from "../utils";

const BLOCK_TYPE = 'input_dynamic_text';

class InputDynamicText extends Component {

  constructor(props) {
    super(props);
    this.state = blockState(props, {
      csvVariable: props.data.csvVariable || '',
      csvTitleVariable: props.data.csvTitleVariable || '',
      highlightable: props.data.highlightable || false,
      question: props.data.question || '',
      highlightedCsvVariable: props.data.highlightedCsvVariable || ''
    });
  }

  validate = () => {
    const data = this.state;
    if (data.csvVariable === '' || data.csvTitleVariable === '') {
      return false;
    }

    return !(data.highlightable && (data.question === '' || data.highlightedCsvVariable === ''));
  };

  onChangeHighlightable = (e) => this.setState(
    {highlightable: e.target.checked},
    () => this.props.onChange(this.state)
  );

  render() {
    return (
      <BlockCard {...this.state} onToggleExpansion={toggleExpansionHandler(this)}
                 title="Input Dynamic Text" type={BLOCK_TYPE} expandable={this.props.expandable}>
        <Row>
          <Col md="12" lg="6">
            <Form.Group>
              <Form.Label>CSV Title Variable</Form.Label>
              <Form.Control name="csvTitleVariable" type="text" value={this.state.csvTitleVariable}
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
                              onChange={textChangeHandler(this)}
                              onBlur={textBlurHandler(this)}/>
              </Form.Group>
            </Col>
            <Col md="12" lg="6">
              <Form.Group>
                <Form.Label>Highlighted CSV Variable</Form.Label>
                <Form.Control name="highlightedCsvVariable" type="text"
                              value={this.state.highlightedCsvVariable}
                              onChange={textChangeHandler(this)}
                              onBlur={textBlurHandler(this)}/>
              </Form.Group>
            </Col>
          </Row>
        }
      </BlockCard>
    );
  }
}

export default {
  blockTypeName: BLOCK_TYPE,
  Component: InputDynamicText
}
