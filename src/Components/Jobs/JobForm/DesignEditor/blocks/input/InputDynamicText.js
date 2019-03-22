import React, {Component} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import BlockCard from "../BlockCard";

const BLOCK_TYPE = 'input_dynamic_text';

const valueOrDefaultIfStringEmptyOrNull = (value, defaultValue) => (value && value.length > 0) ? value : defaultValue;

class InputDynamicText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.data.id,
      type: props.data.type,
      expanded: props.data.expanded || false,

      csvVariable: valueOrDefaultIfStringEmptyOrNull(props.data.csvVariable, 'text_column_name'),
      csvTitleVariable: valueOrDefaultIfStringEmptyOrNull(props.data.csvTitleVariable, 'title_column_name'),
      highlightable: props.data.highlightable || false,
      question: props.data.question || '',
      highlightedCsvVariable: valueOrDefaultIfStringEmptyOrNull(props.data.highlightedCsvVariable, 'highlighted_column_name')
    };
  }

  handleTextChange = (e) => {
    const field = e.target;
    this.setState({[field.name]: field.value});
  };

  handleTextBlur = () => this.props.onChange(this.state);

  onToggleExpansion = expanded => this.setState(
    {expanded},
    () => this.props.onChange(this.state)
  );

  onChangeHighlightable = (e) => this.setState(
    {highlightable: e.target.checked},
    () => this.props.onChange(this.state)
  );

  render() {
    return (
      <BlockCard onToggleExpansion={this.onToggleExpansion} id={this.state.id} expanded={this.state.expanded}
                 title="Input Dynamic Text" type={BLOCK_TYPE} expandable={this.props.expandable}>
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
                <Form.Control name="highlightedCsvVariable" type="text"
                              value={this.state.highlightedCsvVariable}
                              onChange={this.handleTextChange}
                              onBlur={this.handleTextBlur}/>
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
