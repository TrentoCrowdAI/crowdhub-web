import React from 'react';

import ParametersEngine from "../../ParametersEngine/ParametersEngine";
import "./BlockSidebar.css";
import {BlockLabel} from "./BlockLabel";
import BlockRunsControls from "./BlockRunsControls";
import SidebarWithTitle from "../common/SidebarWithTitle";

export default ({block, graphModel, onModelUpdate, runnableWorkflow}) => (

  <SidebarWithTitle
    title="Block parameters"
    center={
      <div className="parameters-engine-container"
           onKeyUp={e => {
             // prevent block cancellation when backspace is pressed
             e.stopPropagation()
           }}>
        <hr/>
        <BlockLabel blockModel={block}
                    graphModel={graphModel}
                    disabled={!runnableWorkflow.canBeEdited()}/>

        <ParametersEngine parametrizedBlock={block}
                          onParameterModelUpdate={onModelUpdate}
                          disabled={!runnableWorkflow.canBeEdited()}/>

        <BlockRunsControls blockModel={block} runnableWorkflow={runnableWorkflow}/>
      </div>
    }
  />
);

