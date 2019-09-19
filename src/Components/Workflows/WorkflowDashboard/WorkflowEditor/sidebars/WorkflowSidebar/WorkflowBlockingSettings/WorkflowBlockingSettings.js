import React from 'react';

import BlockingContextsCRUD from "./BlockingContextsCRUD";
import {ParameterContainerCard} from "../../../ParametersEngine/ParametersEngine";
import WorkflowBlockingCheckbox from "./WorkflowBlockingCheckbox";

const WorkflowBlockingSettings = ({graphModel, onModelUpdate, disabled}) => (
  <ParameterContainerCard title="Experimental groups">
    <WorkflowBlockingCheckbox graphModel={graphModel}
                              onModelUpdate={onModelUpdate}
                              disabled={disabled}/>

    <BlockingContextsCRUD graphModel={graphModel}
                          onModelUpdate={onModelUpdate}
                          disabled={disabled}/>
  </ParameterContainerCard>
);

export default WorkflowBlockingSettings;
