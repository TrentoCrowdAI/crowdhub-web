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
  return (
    <SidebarWithTitle
      title="Workflow properties"
      center={
        <div>
          <hr/>
          <NameAndDescriptionFields onEdit={onEdit}
                                    workflow={workflow}
                                    disabled={runnableWorkflow.isRunning()}/>

          <hr/>
          <WorkflowBlockingSettings graphModel={graphModel}
                                    onModelUpdate={onModelUpdate}/>

          <WorkflowRunsControls runnableWorkflow={runnableWorkflow}/>
        </div>
      }/>
  );
};
