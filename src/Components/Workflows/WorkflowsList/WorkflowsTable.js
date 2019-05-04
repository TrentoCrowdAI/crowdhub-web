/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {Modal, Table} from "react-bootstrap";

import {WORKFLOWS_PATH} from "../Workflows";
import {Link} from "react-router-dom";
import {DeleteButtonAndModal} from "../../common/DeleteButtonAndModal";
import WorkflowsService from "../../../Services/rest/WorkflowsService";

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

const WorkflowsTableRow = ({workflow, onWorkflowDeleted}) => {
  const openWorkflowLink = `${WORKFLOWS_PATH}/${workflow.id}`;

  return (
    <tr>
      <td>
        <Link to={openWorkflowLink}>{workflow.id}</Link>
      </td>
      <td>
        <Link to={openWorkflowLink}>{workflow.name}</Link>
      </td>
      <td>{workflow.description}</td>
      <td>
        <DeleteWorkflowButton workflow={workflow} onWorkflowDeleted={onWorkflowDeleted}/>
      </td>
    </tr>
  );
};

const DeleteWorkflowButton = ({workflow, onWorkflowDeleted}) => (
  <DeleteButtonAndModal
    onDeleted={onWorkflowDeleted}
    serviceCall={() => WorkflowsService.deleteWorkflow(workflow)}

    header={
      <Modal.Title>Delete worflow <span className="project-id">{workflow.name}</span></Modal.Title>
    }

    body={
      <div>
        Are you sure you want to delete "<strong>{workflow.name}</strong>"?
      </div>
    }
  />
);
