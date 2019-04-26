import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import AbstractParameterModel from "../AbstractParameterModel";

const type = 'number';

class NumberModel extends AbstractParameterModel {
  isValid() {
    const value = this.getValue();
    console.log(typeof value)
    return !this.isRequired() || (typeof value === "number" && !isNaN(value))
  }
}

// TODO: This is a copy and paste of Text, improve solution
class NumberWidget extends Component {

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
    this.getModel().setValue(parseInt(value));
    this.setState({value});
  };

  onBlur = () => this.props.onModelUpdated();

  componentWillUnmount = this.onBlur;

  render() {
    const model = this.getModel();
    const definition = model.getDefinition();

    return (
      <Form.Group>
        <Form.Label>{definition.displayName}</Form.Label>
        <Form.Text className="text-muted">
          {definition.description}
        </Form.Text>
        <Form.Control type="number"
                      value={`${this.state.value}`}
                      onChange={this.onChange}
                      onKeyUp={e => e.stopPropagation()}
                      onBlur={this.onBlur}
                      isInvalid={!model.isValid()}
        />{/*prevent block cancellation*/}
        <Form.Control.Feedback type="invalid">
          {definition.displayName} is required
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
}

export default {
  type,
  Model: NumberModel,
  Widget: NumberWidget
}
