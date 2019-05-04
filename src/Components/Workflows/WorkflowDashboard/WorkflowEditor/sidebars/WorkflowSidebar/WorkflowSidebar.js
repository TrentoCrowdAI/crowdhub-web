import React from 'react';
import {Col, Row} from "react-bootstrap";

import './WorkflowSidebar.css';
import NameAndDescriptionFields from "./NameAndDescriptionFields";
import RunsControls from "./RunsControls";

/**
 * Sidebar to edit the workflow name and description
 *
 * TODO: The name Properties was never used inside the project, rename this component
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

        <NameAndDescriptionFields onEdit={onEdit} workflow={workflow}/>
      </div>

      <div className="bottom-button-container">
        <RunsControls/>
      </div>
    </div>
  );
};

export default WorkflowSidebar;
