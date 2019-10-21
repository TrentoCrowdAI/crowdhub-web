/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {Form, Table} from "react-bootstrap";

import './BlockingContextsCRUD.css';
import CreateBlockingContext from "./CreateBlockingContext";
import {EditBlockingContextModalAndButton} from "./EditBlockingContextModalAndButton";

export default class BlockingContextsCRUD extends Component {

  getBlockingContextsModel = () => this.props.graphModel.getBlockingContexts();

  onAddBlockingContext = (context) => {
    this.getBlockingContextsModel().addContext(context);
    this.props.onModelUpdate();
  };

  render() {
    const model = this.getBlockingContextsModel();
    const {disabled} = this.props;
    return (
      <div>
        <Form.Text className="text-muted">
          <strong>Experimental groups</strong>
        </Form.Text>

        <BlockingContextsTable model={model}
                               onModelUpdate={this.props.onModelUpdate}
                               disabled={disabled}/>

        {
          !disabled &&
          <CreateBlockingContext onAdd={this.onAddBlockingContext}/>
        }
      </div>
    );
  }
}


class BlockingContextsTable extends Component {

  getBlockingContextsModel = () => this.props.model;

  getContexts = () => this.getBlockingContextsModel().getContexts();

  isDisabled = () => this.props.disabled;

  render() {
    const contexts = this.getContexts();
    if (contexts.length <= 0) {
      return this.renderNoBlockingContextsYet();
    }

    return this.renderTable();
  }

  renderNoBlockingContextsYet = () => (
    <Form.Text className="text-muted">
      No experimental groups created yet in this workflow.
    </Form.Text>
  );

  renderTable = () => (
    <Table striped bordered hover size="sm" className="blocking-contexts-table">
      <thead>
      <tr>
        <th/>
        <th className="name-column">Name</th>

        {
          /* actions column */
          !this.isDisabled() &&
          <th/>
        }
      </tr>
      </thead>
      <tbody>

      {
        this.getContexts().map(context => (
          <BlockingContextsTableRow key={context.id}
                                    context={context}
                                    disabled={this.isDisabled()}
                                    blockingContextsModel={this.getBlockingContextsModel()}
                                    onModelUpdate={this.props.onModelUpdate}/>
        ))
      }
      </tbody>
    </Table>
  );
}

const BlockingContextsTableRow = ({context, disabled, blockingContextsModel, onModelUpdate}) => (
  <tr>
    <td className="color-box-container">
      <div className="color-box" style={{backgroundColor: context.color}}/>
    </td>
    <td>{context.name}</td>
    {
      /* actions cell */
      !disabled &&
      <td className="actions-cell">
        <div className="actions">

          {/* edit */}
          <EditBlockingContextModalAndButton context={context}
                                             onModelUpdate={onModelUpdate}/>

          {/* delete */}
          <DeleteBlockingContextCell blockingContextsModel={blockingContextsModel}
                                     context={context}
                                     onModelUpdate={onModelUpdate}/>
        </div>

      </td>
    }
  </tr>
);


class DeleteBlockingContextCell extends Component {

  // TODO: Ask confirmation to the user
  onRemoveContext = (context) => {
    const model = this.getBlockingContextsModel();
    model.removeContext(context);
    this.props.onModelUpdate();
  };

  getBlockingContextsModel = () => this.props.blockingContextsModel;

  render() {
    const {context} = this.props;
    return (
      <a className="icon-button delete" onClick={() => this.onRemoveContext(context)}>
        <i className="fas fa-trash-alt"/>
      </a>
    );
  }
}
