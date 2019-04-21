import React, {Component} from 'react';
import {Form} from "react-bootstrap";

// TODO: This is a copy and paste of Text, improve solution
class Number extends Component {
  changed = false;

  constructor(props) {
    super(props);
    this.state = {
      value: parseInt(this.props.parameter.value) || 0,
      isValid: this.isValueValid(this.props.parameter.value)
    }
  }

  onChange = (event) => {
    const {value} = event.target;
    this.setState({
      value,
      isValid: this.isValueValid(value)
    }, () => this.changed = true);
  };

  onBlur = () => {
    if (this.changed) {
      this.props.onValueChanged(this.state.value, this.state.isValid);
      this.changed = false;
    }
  };

  componentWillUnmount = this.onBlur;

  isValueValid = (value) => !isNaN(value);

  render() {
    const {parameter} = this.props;
    const displayName = parameter.displayName || parameter.name;
    return (
      <Form.Group>
        <Form.Label>{parameter.displayName || parameter.name}</Form.Label>
        <Form.Text className="text-muted">
          {parameter.description}
        </Form.Text>
        <Form.Control type="number"
                      value={this.state.value}
                      onChange={this.onChange}
                      onKeyUp={e => e.stopPropagation()}
                      onBlur={this.onBlur}
                      isInvalid={!this.state.isValid}
        />{/*prevent block cancellation*/}
        <Form.Control.Feedback type="invalid">
          {displayName} is required
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
}

export default {
  type: 'number',
  Component: Number
}
