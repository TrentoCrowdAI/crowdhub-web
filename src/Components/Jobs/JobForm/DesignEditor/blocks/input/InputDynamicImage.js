import React, {Component} from 'react';
import BlockCard from "../BlockCard";
import {textBlurHandler, textChangeHandler, toggleExpansionHandler} from "../utils";
import {Col, Form, Row} from "react-bootstrap";

const BLOCK_TYPE = "input_dynamic_image";

class InputDynamicImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.data.id,
      type: props.data.type,
      expanded: props.data.expanded || false,

      csvVariable: props.data.csvVariable || '',
      highlightable: props.data.highlightable || false,
      question: props.data.question || '',
      highlightedCsvVariable: props.data.highlightedCsvVariable || ''
    };
  }


  onChangeHighlightable = (e) => this.setState(
    {highlightable: e.target.checked},
    () => this.props.onChange(this.state)
  );

  render() {
    return (
      <BlockCard onToggleExpansion={toggleExpansionHandler(this)} id={this.state.id} expanded={this.state.expanded}
                 title="Input Dynamic Image" type={BLOCK_TYPE} expandable={this.props.expandable}>

        <Form.Group>
          <Form.Label>CSV Variable</Form.Label>
          <Form.Control name="csvVariable" type="text" value={this.state.csvVariable}
                        onChange={textChangeHandler(this)}
                        onBlur={textBlurHandler(this)}/>
        </Form.Group>

        <Form.Group>
          <Form.Check type="checkbox" name="highlightable" label="Enable image highlighting"
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
  Component: InputDynamicImage
};
