/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {Form, Table} from "react-bootstrap";

import './BlockingContextsCRUD.css';
import CreateBlockingContext from "./CreateBlockingContext";

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
        <Form.Text className="text-muted">
          <strong>Blocking contexts</strong>
        </Form.Text>

        <BlockingContextsTable model={model}/>
        <CreateBlockingContext onAdd={this.onAddBlockingContext}/>
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

    if (contexts.length <= 0) {
      return (
        <Form.Text className="text-muted">
          No blocking contexts created yet in this workflow
        </Form.Text>
      )
    }

    return (
      <Table striped bordered hover size="sm" className="blocking-contexts-table">
        <thead>
        <tr>
          <th/>
          <th className="name-column">Name</th>
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
