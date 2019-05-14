import React from 'react';

import NameAndDescriptionFields from "./NameAndDescriptionFields";
import WorkflowRunsControls from "./WorkflowRunsControls";
import SidebarWithBottomBox from "../common/SidebarWithBottomBox";

/**
 * Sidebar to edit the workflow name and description
 *
 */
export default ({runnableWorkflow, onEdit}) => {
  const workflow = runnableWorkflow.getWorkflow();
  // TODO: Remove Sidebar component
  return (
    <SidebarWithBottomBox
      title="Workflow properties"
      center={
        <div>
          <hr/>
          <NameAndDescriptionFields onEdit={onEdit}
                                    workflow={workflow}
                                    disabled={runnableWorkflow.isRunning()}/>

          <WorkflowRunsControls runnableWorkflow={runnableWorkflow}/>
        </div>}
      bottom={<div></div>}/>
  );
};
