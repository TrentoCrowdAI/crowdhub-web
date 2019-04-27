import React from 'react';
import {Col, Row} from "react-bootstrap";

import ParametersEngine from "./ParametersEngine/ParametersEngine";
import "./NodeConfiguratorSidebar.css";

export default ({node, onModelUpdate}) => {

  return (
    <div className="parameters-engine-container">
      <Row>
        <Col>
          <h5>Block parameters</h5>
        </Col>
      </Row>


      <ParametersEngine
        parametrizedBlock={node}
        onParameterModelUpdate={onModelUpdate}/>
    </div>
  );
}
