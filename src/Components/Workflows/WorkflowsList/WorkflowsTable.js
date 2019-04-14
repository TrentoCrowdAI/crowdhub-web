import React, {Component} from "react";
import {Table} from "react-bootstrap";

import {ignoreEventAnd} from "../../utils/events";
import DeleteWorkflowModal from "./DeleteWorkflowModal";
import {WORKFLOWS_PATH} from "../Workflows";
import {Link} from "react-router-dom";

export const WorkflowsTable = ({workflows, onWorkflowDeleted}) => (
  <Table hover>
    <thead>
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Description</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    {
      workflows.map(workflow => (
        <WorkflowsTableRow workflow={workflow}
                           key={workflow.id}
                           onWorkflowDeleted={onWorkflowDeleted}/>
      ))
    }
    </tbody>
  </Table>
);

class WorkflowsTableRow extends Component {

  state = {};

  onUserWantToDeleteWorkflow = () => this.setState({delete: true});

  onUserCancelDeletion = () => this.setState({delete: false});

  render() {
    const workflow = this.props.workflow;
    const openWorkflowLink = `${WORKFLOWS_PATH}/${workflow.id}`;

    return (
      <tr>
        { /* Confirm delete workflow modal */}
        <DeleteWorkflowModal workflowToDelete={workflow} show={this.state.delete}
                             onCancel={this.onUserCancelDeletion}
                             onWorkflowDeleted={this.props.onWorkflowDeleted}/>

        <td>
          <Link to={openWorkflowLink}>{workflow.id}</Link>
        </td>
        <td>
          <Link to={openWorkflowLink}>{workflow.data.name}</Link>
        </td>
        <td>{workflow.data.description}</td>
        <td>
          <a className="icon-button"
             onClick={ignoreEventAnd(this.onUserWantToDeleteWorkflow)}>
            <i className="fas fa-trash-alt"/>
          </a>
        </td>
      </tr>
    );
  }
}
