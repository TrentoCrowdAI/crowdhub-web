import React, {Component} from 'react';
import {Form} from "react-bootstrap";

// TODO: This is a copy and paste of Text, improve solution
class Number extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.parameter.value,
      isValid: true
    }
  }

  onChange = (event) => {
    const {checked} = event.target;
    this.setState({
      value: checked
    }, () => this.props.onValueChanged(this.state.value, true));
  };

  render() {
    const {parameter} = this.props;
    const displayName = parameter.displayName || parameter.name;

    return (
      <Form.Group>
        <Form.Label>
          {displayName}
        </Form.Label>
        <Form.Text className="text-muted">
          {parameter.description}
        </Form.Text>
        <Form.Check type="checkbox"
                    label={displayName}
                    checked={this.state.value}
                    onChange={this.onChange}/>
      </Form.Group>
    );
  }
}

export default {
  type: 'boolean',
  Component: Number
}
