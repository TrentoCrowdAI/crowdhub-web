import React from 'react';

import ParametersEngine from "../../ParametersEngine/ParametersEngine";
import "./BlockSidebar.css";
import {BlockLabel} from "./BlockLabel";
import BlockRunsControls from "./BlockRunsControls";
import SidebarWithTitle from "../common/SidebarWithTitle";

export default ({block, graphModel, onModelUpdate, runnableWorkflow, disabled, readOnly}) => (

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
                    disabled={disabled}/>

        <ParametersEngine parametrizedBlock={block}
                          onParameterModelUpdate={onModelUpdate}
                          disabled={disabled}
                          parametersInCard/>

        <BlockRunsControls blockModel={block}
                           runnableWorkflow={runnableWorkflow}
                           disabled={disabled}
                           readOnly={readOnly}/>
      </div>
    }
  />
);

