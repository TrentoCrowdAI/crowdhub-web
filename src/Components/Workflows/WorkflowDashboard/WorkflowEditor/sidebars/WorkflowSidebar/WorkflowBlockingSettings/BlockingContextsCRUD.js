/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {Button, Col, Form, Table} from "react-bootstrap";
import uuid from 'uuid';

import './BlockingContextsCRUD.css';
import RandomColorPicker from "./RandomColorPicker";

export default class BlockingContextsCRUD extends Component {

  getBlockingContextsModel = () => this.props.graphModel.getBlockingContexts();

  onAddBlockingContext = (context) => {
    this.getBlockingContextsModel().addContext(context);
    this.forceUpdate();
    console.log(context);
  };

  render() {
    const model = this.getBlockingContextsModel();
    return (
      <div>
        <h6>Blocking contexts</h6>

        <BlockingContextsTable model={model}/>

        <span>Add blocking context</span>

        <AddBlockingContext onAdd={this.onAddBlockingContext}/>
      </div>
    );
  }
}


class BlockingContextsTable extends Component {
  // TODO: Ask confirmation to the user
  onRemoveContext = (context) => {
    const model = this.getBlockingContextsModel();
    model.removeContext(context);
    this.forceUpdate();
  };

  getBlockingContextsModel = () => this.props.model;

  render() {
    const model = this.getBlockingContextsModel();
    const contexts = model.getContexts();
    return (
      <Table striped bordered hover size="sm">
        <thead>
        <tr>
          <th/>
          <th>Name</th>
          <th/>
        </tr>
        </thead>
        <tbody>

        {
          contexts.map(context => (
            <tr key={context.id}>
              <td className="color-box-container">
                <div className="color-box" style={{backgroundColor: context.color}}/>
              </td>
              <td>{context.name}</td>
              <td>
                <a className="icon-button delete" onClick={() => this.onRemoveContext(context)}>
                  <i className="fas fa-trash-alt"/>
                </a>
              </td>
            </tr>
          ))
        }
        </tbody>
      </Table>
    );
  }
}

class AddBlockingContext extends Component {

  state = {
    name: '',
    color: null
  };

  onNameChange = (e) => this.setState({name: e.target.value});

  onChangeColor = (color) => this.setState({color});

  isValid = () => this.state.name.length > 0;

  onAdd = () => {
    this.props.onAdd({
      id: uuid(),
      name: this.state.name,
      color: this.state.color
    });
    this.setState({name: '', color: null});
  };

  render() {
    const {name, color} = this.state;
    return (
      <Form.Row>
        <Col xs="12">
          <Form.Group>
            <Form.Control name="name"
                          type="text"
                          placeholder="Blocking context name"
                          value={name}
                          onChange={this.onNameChange}/>
          </Form.Group>

        </Col>
        <Col xs="8">
          <RandomColorPicker color={color} onChange={this.onChangeColor}/>
        </Col>
        <Col xs="4">
          <Button className="btn-block"
                  disabled={!this.isValid()}
                  onClick={this.onAdd}>Add</Button>
        </Col>
      </Form.Row>
    );
  }
}
