import React, {Component} from 'react';
import {
  blockState,
  checkboxChangeHandler,
  selectChangeHandler,
  textBlurHandler,
  textChangeHandler,
  toggleExpansionHandler
} from "../utils";
import BlockCard from "../BlockCard";
import {Col, Form, Button, Table} from "react-bootstrap";

const BLOCK_TYPE = 'output_choices';

class OutputChoices extends Component {

  constructor(props) {
    super(props);
    this.state = blockState(props, {

      question: props.data.question || '',
      choices: props.data.choices || [],
      csvVariable: props.data.csvVariable || '',
      required: props.data.required || false,
      choice_type: props.data.choice_type || 'multiple_checkbox'
    });
  }

  onChoicesChanged = choices => this.setState({choices}, () => this.props.onChange(this.state));

  validate = () => {
    const data = this.state;

    if (data.csvVariable === '' || data.csvTitleVariable === '') {
      return false;
    }

    return data.choices.length !== 0;
  };

  render() {
    return (
      <BlockCard onToggleExpansion={toggleExpansionHandler(this)} {...this.state}
                 title="Output Choices" type={BLOCK_TYPE} expandable={this.props.expandable}>
        <Form.Row>
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
        </Form.Row>
        <Form.Row>
          <Col md="12" lg="6">
            <Form.Group>
              <Form.Check type="checkbox" name="required" label="Required"
                          checked={this.state.required} onChange={checkboxChangeHandler(this)}/>
            </Form.Group>
          </Col>

          <Col md="12" lg="6">
            <Form.Group>
              <Form.Label>Choice type</Form.Label>
              <Form.Control as="select" name="choice_type" onChange={selectChangeHandler(this)}
                            value={this.state.choice_type}>
                <option value="multiple_checkbox">Multiple choice</option>
                <option value="single_radio">Single choice radio</option>
                <option value="single_dropdown">Single choice dropdown</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>

        <Choices choices={this.state.choices} onChange={this.onChoicesChanged}/>
      </BlockCard>
    );
  }
}

class Choices extends Component {


  state = {
    newLabel: '',
    newValue: ''
  };

  onAddChoice = () => {
    const choices = this.props.choices;
    choices.push({
      label: this.state.newLabel,
      value: this.state.newValue
    });
    this.setState({
      newLabel: '',
      newValue: ''
    }, () => this.props.onChange(choices));
  };

  onRemoveChoice = (index) => {
    const choices = this.props.choices;
    choices.splice(index, 1);
    this.props.onChange(choices);
  };

  isNewChoiceValid = () => this.state.newLabel.trim() !== '' && this.state.newValue.trim() !== '';

  render() {
    return (
      <div>
        <h5>Choices</h5>
        <hr/>
        <Table striped bordered hover variant="dark">
          <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {this.props.choices.map((choice, index) => ( // TODO: Assert unique
            <tr key={choice.value}>
              <td>{choice.label}</td>
              <td>{choice.value}</td>
              <td>
                <a className="icon-button" onClick={() => this.onRemoveChoice(index)}>
                  <i className="fas fa-trash-alt"/>
                </a>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>

        <Form.Row>
          <Col md="12" lg="6">
            <Form.Group>
              <Form.Label>Label</Form.Label>
              <Form.Control name="newLabel" type="text" value={this.state.newLabel}
                            onChange={textChangeHandler(this)}/>
            </Form.Group>
          </Col>
          <Col md="12" lg="6">
            <Form.Group>
              <Form.Label>Value</Form.Label>
              <Form.Control name="newValue" type="text" value={this.state.newValue}
                            onChange={textChangeHandler(this)}/>
            </Form.Group>
          </Col>
          <Col md="12" className="">
            <Button onClick={this.onAddChoice} disabled={!this.isNewChoiceValid()}>Add</Button>
          </Col>
        </Form.Row>
      </div>
    );
  }
}

export default {
  blockTypeName: BLOCK_TYPE,
  Component: OutputChoices
}
