import React from 'react';

import NameAndDescriptionFields from "./NameAndDescriptionFields";
import WorkflowRunsControls from "./WorkflowRunsControls";
import SidebarWithTitle from "../common/SidebarWithTitle";
import WorkflowBlockingSettings from "./WorkflowBlockingSettings/WorkflowBlockingSettings";

/**
 * Sidebar to edit the workflow name and description
 *
 */
export default ({runnableWorkflow, onEdit, onModelUpdate, graphModel}) => {
  const workflow = runnableWorkflow.getWorkflow();
  const disabled = runnableWorkflow.isRunning();
  return (
    <SidebarWithTitle
      title="Workflow properties"
      center={
        <div>
          <hr/>
          <NameAndDescriptionFields onEdit={onEdit}
                                    workflow={workflow}
                                    disabled={disabled}/>

          <WorkflowBlockingSettings graphModel={graphModel}
                                    onModelUpdate={onModelUpdate}
                                    disabled={disabled}/>

          <WorkflowRunsControls runnableWorkflow={runnableWorkflow}/>
        </div>
      }/>
  );
};
