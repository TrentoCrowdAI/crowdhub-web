import React, {Component} from 'react';
import {Form} from "react-bootstrap";

import AbstractParameterModel from "../AbstractParameterModel";

class TextFromDropdownModel extends AbstractParameterModel {

  isValid() {
    const value = this.getValue();
    const choices = this.getChoices();
    return choices.find(choice => choice.value === value) !== null;
  }

  getChoices () {
    return this.getDefinition().choices;
  }
}

class TextFromDropdownWidget extends Component {

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
    const definition = model.getDefinition();

    return (
      <Form.Group>
        <Form.Text className="text-muted">
          {definition.description}
        </Form.Text>

        <Form.Control as="select" value={model.getValue()} onChange={this.onChangeValue} disabled={this.props.disabled}>
          {
            model.getChoices().map(choice => (
              <option key={choice.value} value={choice.value}>{choice.label}</option>
            ))
          }
        </Form.Control>
      </Form.Group>
    );
  }
}

export default {
  type: 'textFromDropdown',
  Widget: TextFromDropdownWidget,
  Model: TextFromDropdownModel
}
