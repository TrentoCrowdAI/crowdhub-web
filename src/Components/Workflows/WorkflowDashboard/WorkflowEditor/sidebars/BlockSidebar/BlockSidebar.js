import React from 'react';
import {Col, Row} from "react-bootstrap";

import ParametersEngine from "../../ParametersEngine/ParametersEngine";
import "./BlockSidebar.css";
import {BlockLabel} from "./BlockLabel";
import BlockResultDownloader from "./BlockResultDownloader";

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

    <BlockLabel blockModel={block}
                graphModel={graphModel}/>

    <ParametersEngine parametrizedBlock={block}
                      onParameterModelUpdate={onModelUpdate}/>

    <BlockResultDownloader blockModel={block}/>
  </div>
);

