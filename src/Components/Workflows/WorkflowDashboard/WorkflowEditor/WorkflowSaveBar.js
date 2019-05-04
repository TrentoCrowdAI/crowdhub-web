import React from "react";
import {Navbar} from "react-bootstrap";

import {PROJECTS_PATH} from "../../../Projects/Projects";
import LoadingButton from "../../../common/LoadingButton";
import BackButton from "../../../common/BackButton";

export const WorkflowSaveBar = ({runnableWorkflow, graphModel, isSaving, onSavePressed}) => {
  const isValid = graphModel.isValid();
  const isRunning = runnableWorkflow.isLatestRunRunning();
  const workflow = runnableWorkflow.getWorkflow();
  return (
    <Navbar className="light-background justify-content-between workflow-bottom-navbar">
      <BackButton text="Return to project" to={`${PROJECTS_PATH}/${workflow.projectId}`}/>

      <div>
        {
          !isValid &&
          <span>
            <i className="fas fa-exclamation-triangle"/> Workflow contains some errors
          </span>
        }

        {
          isRunning &&
          <span>
            Edit is disabled while the workflow is running
          </span>
        }
      </div>

      <LoadingButton disabled={!isValid || isSaving || isRunning}
                     isSaving={isSaving} onClick={onSavePressed}>Save</LoadingButton>
    </Navbar>
  )
};
