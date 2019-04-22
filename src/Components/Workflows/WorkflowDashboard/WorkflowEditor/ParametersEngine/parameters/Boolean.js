import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import AbstractParameterModel from "../AbstractParameterModel";

const type = 'boolean';

class Model extends AbstractParameterModel {


  isValid() {
    return true;
  }
}

// TODO: This is a copy and paste of Text, improve solution
class Widget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.getModel().getValue()
    };
  }

  getModel() {
    return this.props.model;
  }

  onChange = (event) => {
    const {checked} = event.target;
    this.getModel().setValue(checked);
    this.setState({value: checked}, this.props.onModelUpdated);
  };

  render() {
    const model = this.getModel();

    return (
      <Form.Group>
        <Form.Label>
          {model.getDisplayName()}
        </Form.Label>
        <Form.Text className="text-muted">
          {model.getDescription()}
        </Form.Text>
        <Form.Check type="checkbox"
                    label={model.getDisplayName()}
                    checked={this.state.value}
                    onChange={this.onChange}/>
      </Form.Group>
    );
  }
}

export default {
  type,
  Model,
  Widget
}
