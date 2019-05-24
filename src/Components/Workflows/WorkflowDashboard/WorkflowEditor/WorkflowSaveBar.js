import React from "react";
import {Navbar} from "react-bootstrap";

import {PROJECTS_PATH} from "../../../Projects/Projects";
import LoadingButton from "../../../common/LoadingButton";
import BackButton from "../../../common/BackButton";
import "./WorkflowSaveBar.css";

export const WorkflowSaveBar = ({runnableWorkflow, graphModel, isSaving, onSavePressed, saveError, disabled}) => {
  const isValid = graphModel.isValid();
  const workflow = runnableWorkflow.getWorkflow();
  return (
    <Navbar className="light-background justify-content-between workflow-bottom-navbar">
      <BackButton text="Return to project" to={`${PROJECTS_PATH}/${workflow.projectId}`}/>

      <div>
        {
          !isValid &&
          <span className="warning">
            <i className="fas fa-exclamation-triangle"/> Workflow contains some errors
          </span>
        }

        {
          disabled &&
          <span>
            Edit is disabled while the workflow is running
          </span>
        }

        {
          !disabled && saveError &&
          <span className="warning">
            <i className="fas fa-exclamation-triangle"/> Error while saving the workflow
          </span>
        }
      </div>

      <LoadingButton disabled={!isValid || isSaving || disabled}
                     isLoading={isSaving} onClick={onSavePressed}>Save</LoadingButton>
    </Navbar>
  )
};
