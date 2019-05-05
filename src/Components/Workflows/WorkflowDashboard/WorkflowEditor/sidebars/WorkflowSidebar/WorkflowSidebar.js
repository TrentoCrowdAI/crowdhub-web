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
  return (
    <SidebarWithBottomBox
      title="Workflow properties"
      center={
        <div>
          <hr/>
          <NameAndDescriptionFields onEdit={onEdit}
                                    workflow={workflow}
                                    disabled={runnableWorkflow.isLatestRunRunning()}/>
        </div>}
      bottom={<WorkflowRunsControls runnableWorkflow={runnableWorkflow}/>}/>
  );
};
