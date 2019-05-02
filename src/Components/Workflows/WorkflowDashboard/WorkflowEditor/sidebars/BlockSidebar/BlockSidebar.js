import React from 'react';
import {Col, Row} from "react-bootstrap";

import ParametersEngine from "../../ParametersEngine/ParametersEngine";
import "./BlockSidebar.css";
import {IdField} from "./IdField";

export default ({block, graphModel, onModelUpdate}) => (
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

    {/* The users sees the id as a property, but it isn't a real property, it's the block id */}
    <IdField
      blockModel={block}
      graphModel={graphModel}/>

    <ParametersEngine
      parametrizedBlock={block}
      onParameterModelUpdate={onModelUpdate}/>
  </div>
);

