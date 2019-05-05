import React from 'react';

import ParametersEngine from "../../ParametersEngine/ParametersEngine";
import "./BlockSidebar.css";
import {BlockLabel} from "./BlockLabel";
import BlockRunsControls from "./BlockRunsControls";
import SidebarWithBottomBox from "../common/SidebarWithBottomBox";

export default ({block, graphModel, onModelUpdate, runnableWorkflow}) => (

  <SidebarWithBottomBox
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
                    disabled={runnableWorkflow.isLatestRunRunning()}/>

        <ParametersEngine parametrizedBlock={block}
                          onParameterModelUpdate={onModelUpdate}
                          disabled={runnableWorkflow.isLatestRunRunning()}/>
      </div>
    }
    bottom={<BlockRunsControls blockModel={block}/>}
  />
);

