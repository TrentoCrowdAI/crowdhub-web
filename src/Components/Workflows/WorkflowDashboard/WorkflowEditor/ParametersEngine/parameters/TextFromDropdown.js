import React, {Component} from 'react';
import {Form} from "react-bootstrap";

import AbstractParameterModel from "../AbstractParameterModel";

class TextFromDropdownWidget extends Component {

  constructor (props) {
    super(props);
  }

  getModel() {
    return this.props.model;
  }

  onChangeValue =(event) => {
    const value = event.target.value;
    this.getModel().setValue(value);
    this.props.onModelUpdated();
  };

  render() {
    const model = this.getModel();

    return (
      <Form.Group>
        <Form.Label>{model.getDisplayName()}</Form.Label>
        <Form.Text className="text-muted">
          {model.getDescription()}
        </Form.Text>

        <Form.Control as="select" value={model.getValue()} onChange={this.onChangeValue}>
          {
            model.choices.map(choice => (
              <option key={choice.value} value={choice.value}>{choice.name}</option>
            ))
          }
        </Form.Control>
      </Form.Group>
    );
  }
}

class TextFromDropdownModel extends AbstractParameterModel {

  choices = null;

  deSerialize(data) {
    super.deSerialize(data);
    this.choices = data.choices;
  }

  serialize() {
    return {
      ...super.serialize(),
      choices: this.choices
    };
  }

  isValid() {
    const value = this.getValue();
    return this.choices.find(choice => choice.value === value) !== null;
  }
}

export default {
  type: 'textFromDropdown',
  Widget: TextFromDropdownWidget,
  Model: TextFromDropdownModel
}
