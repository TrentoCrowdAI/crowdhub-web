import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import AbstractParameterModel from "../AbstractParameterModel";

const type = 'number';

class NumberModel extends AbstractParameterModel {
  isValid() {
    const value = this.getValue();
    return !this.isRequired() || (typeof value === "number" && !isNaN(value))
  }
}

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
      <div>
        <Form.Text className="text-muted">
          {definition.description}
        </Form.Text>
        <Form.Control type="number"
                      value={`${this.state.value}`}
                      onChange={this.onChange}
                      onBlur={this.onBlur}
                      isInvalid={!model.isValid()}
                      disabled={this.props.disabled}/>
        <Form.Control.Feedback type="invalid">
          {definition.displayName} is required
        </Form.Control.Feedback>
      </div>
    );
  }
}

export default {
  type,
  Model: NumberModel,
  Widget: NumberWidget
}
