import React from "react";
import {Navbar} from "react-bootstrap";

import {PROJECTS_PATH} from "../../../Projects/Projects";
import LoadingButton from "../../../common/LoadingButton";
import BackButton from "../../../common/BackButton";

export const WorkflowSaveBar = ({workflow, graphModel, isSaving, onSavePressed}) => {
  const isValid = graphModel.isValid();
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
      </div>

      <LoadingButton disabled={!isValid || isSaving} isSaving={isSaving} onClick={onSavePressed}>Save</LoadingButton>
    </Navbar>
  )
};
