import React, {Component} from "react";
import {Button, Col, Form, Table} from "react-bootstrap";

import AbstractParameterModel from "../AbstractParameterModel";


class ChoiceBuilderModel extends AbstractParameterModel {

  isValid() {
    return this.getChoices().length > 0;
  }

  getChoices() {
    return this.getValue();
  }

  setChoices(choices) {
    this.setValue(choices);
  }

  removeChoiceByIndex(index) {
    this.getChoices()
      .splice(index, 1);
  }

  addChoice(choice) {
    this.getChoices().push(choice);
  }
}

class ChoiceBuilderWidget extends Component {

  getModel() {
    return this.props.model;
  }

  onRemoveChoice = (index) => {
    this.getModel().removeChoiceByIndex(index);
    this.props.onModelUpdated();
  };

  onAddChoice = (choice) => {
    this.getModel().addChoice(choice);
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


        <ChoicesTable choices={model.getChoices()} onRemoveChoice={this.onRemoveChoice}/>
        <AddChoice onAddChoice={this.onAddChoice}/>

      </Form.Group>
    );
  }
}


const ChoicesTable = ({choices, onRemoveChoice}) => (
  <Table striped bordered hover>
    <thead>
    <tr>
      <th>Label</th>
      <th>Value</th>
      <th/>
    </tr>
    </thead>
    <tbody>
    {
      choices.map((choice, index) => ( // TODO: Assert unique
        <tr key={choice.value}>
          <td>{choice.label}</td>
          <td>{choice.value}</td>
          <td>
            <button className="icon-button button-link" onClick={() => onRemoveChoice(index)}>
              <i className="fas fa-trash-alt"/>
            </button>
          </td>
        </tr>
      ))
    }
    </tbody>
  </Table>
);

class AddChoice extends Component {

  state = {
    label: '',
    value: ''
  };

  isNewChoiceValid = () => this.state.label.length > 0 && this.state.value.length > 0;

  onAddChoice = () => {
    this.props.onAddChoice({
      label: this.state.label,
      value: this.state.value
    });
    this.setState({
      label: '',
      value: ''
    });
  };

  render() {
    return (
      <Form.Row>
        <Col md="12" lg="6">
          <Form.Group>
            <Form.Label>Label</Form.Label>
            <Form.Control name="label" type="text" value={this.state.label}
                          onChange={(event) => this.setState({label: event.target.value})}/>
          </Form.Group>
        </Col>
        <Col md="12" lg="6">
          <Form.Group>
            <Form.Label>Value</Form.Label>
            <Form.Control name="value" type="text" value={this.state.value}
                          onChange={(event) => this.setState({value: event.target.value})}/>
          </Form.Group>
        </Col>
        <Col md="12" className="">
          <Button onClick={this.onAddChoice} disabled={!this.isNewChoiceValid()}>Add</Button>
        </Col>
      </Form.Row>
    );
  }
}

export default {
  type: 'choiceBuilder',
  Widget: ChoiceBuilderWidget,
  Model: ChoiceBuilderModel
}
