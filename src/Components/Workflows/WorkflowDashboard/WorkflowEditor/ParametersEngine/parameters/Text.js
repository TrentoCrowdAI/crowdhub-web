import React, {Component} from 'react';

import {Form} from 'react-bootstrap';
import AbstractParameterModel from "../AbstractParameterModel";

class Model extends AbstractParameterModel {

  isValid() {
    return !!this.value && this.value.length > 0
  }
}

class Widget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.getModel().getValue()
    }
  }

  getModel() {
    return this.props.model;
  }

  onChange = (event) => {
    const {value} = event.target;
    this.getModel().setValue(value);
    this.setState({value});
  };

  onBlur = () => this.props.onModelUpdated();

  componentWillUnmount = this.onBlur;

  render() {
    const model = this.getModel();

    return (
      <Form.Group>
        <Form.Label>{model.getDisplayName()}</Form.Label>
        <Form.Text className="text-muted">
          {model.getDescription()}
        </Form.Text>
        <Form.Control type="text"
                      value={this.state.value}
                      onChange={this.onChange}
                      onKeyUp={e => e.stopPropagation()}
                      onBlur={this.onBlur}
                      isInvalid={!model.isValid()}
        />{/*prevent block cancellation*/}
        <Form.Control.Feedback type="invalid">
          {model.getDisplayName()} is required
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
}

export default {
  type: 'text',
  Widget,
  Model
}
