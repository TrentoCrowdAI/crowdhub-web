import React from 'react';
import {Col, Row} from "react-bootstrap";

import ParametersEngine from "../../ParametersEngine/ParametersEngine";
import "./BlockSidebar.css";
import {BlockLabel} from "./BlockLabel";
import BlockRunsControls from "./BlockRunsControls";

export default ({block, graphModel, onModelUpdate, runnableWorkflow}) => (
  <div className="parameters-engine-container"
       onKeyUp={e => {
         // prevent block cancellation when backspace is pressed
         e.stopPropagation()
       }}>
    <Row>
      <Col>
        <h5>Block parameters</h5>
      </Col>
    </Row>

    <BlockLabel blockModel={block}
                graphModel={graphModel}
                disabled={runnableWorkflow.isLatestRunRunning()}/>


    <ParametersEngine parametrizedBlock={block}
                      onParameterModelUpdate={onModelUpdate}
                      disabled={runnableWorkflow.isLatestRunRunning()}/>

    <BlockRunsControls blockModel={block}/>
  </div>
);

