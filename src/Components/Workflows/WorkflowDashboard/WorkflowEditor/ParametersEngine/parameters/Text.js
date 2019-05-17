import React, {Component} from 'react';

import {Form} from 'react-bootstrap';
import AbstractParameterModel from "../AbstractParameterModel";

//  TODO: Show in a dialog in the sidebar
class TextModel extends AbstractParameterModel {

  isValid() {
    const definition = this.getDefinition();
    if (definition.required) {
      const value = this.getValue();
      return value && value.length > 0
    } else {
      return true;
    }
  }
}

class TextWidget extends Component {

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
    const definition = model.getDefinition();

    return (
      <Form.Group>
        <Form.Text className="text-muted">
          {definition.description}
        </Form.Text>
        <Form.Control type="text"
                      value={this.state.value}
                      onChange={this.onChange}
                      onBlur={this.onBlur}
                      isInvalid={!model.isValid()}
                      disabled={this.props.disabled}/>
        <Form.Control.Feedback type="invalid">
          {definition.displayName} is required
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
}

export default {
  type: 'text',
  Widget: TextWidget,
  Model: TextModel
}
