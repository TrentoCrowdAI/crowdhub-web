import React from 'react';
import {Col, Row} from "react-bootstrap";
import ParametersEngine from "./ParametersEngine/ParametersEngine";
import {PrimitiveParameters} from "./ParametersEngine/parameters";

export default ({node, onModelUpdate}) => (
  <BlockConfigurator block={node.data}
                     blockId={node.id}
                     onModelUpdate={onModelUpdate}/>
);

const BlockConfigurator = ({block, blockId, onModelUpdate}) => (
  <div>
    <Row>
      <Col>
        <h5>Block parameters</h5>
      </Col>
    </Row>

    <ParametersEngine
      parametersContainerId={blockId}
      parameters={block.parameters}
      onParameterModelUpdate={onModelUpdate}
      supportedParameters={PrimitiveParameters}/>
  </div>
);
