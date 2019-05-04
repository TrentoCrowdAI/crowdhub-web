import React from 'react';
import {Col, Row} from "react-bootstrap";

import './WorkflowSidebar.css';
import NameAndDescriptionFields from "./NameAndDescriptionFields";
import WorkflowRunsControls from "./WorkflowRunsControls";

/**
 * Sidebar to edit the workflow name and description
 *
 */
const WorkflowSidebar = ({runnableWorkflow, onEdit}) => {
  const workflow = runnableWorkflow.getWorkflow();
  return (
    <div className="workflow-column">
      <div>
        <Row>
          <Col>
            <h5>Workflow properties</h5>
          </Col>
        </Row>

        <NameAndDescriptionFields onEdit={onEdit} workflow={workflow} disabled={runnableWorkflow.isLatestRunRunning()}/>
      </div>

      <div className="bottom-button-container">
        <WorkflowRunsControls runnableWorkflow={runnableWorkflow}/>
      </div>
    </div>
  );
};

export default WorkflowSidebar;
