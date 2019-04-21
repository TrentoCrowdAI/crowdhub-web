import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";
import ParametersEngine from "./ParametersEngine/ParametersEngine";
import {PrimitiveParameters} from "./ParametersEngine/parameters";

export default class NodeConfiguratorSidebar extends Component {

  onBlockChanged = (block) => {
    const node = this.props.node;
    node.data = block;
    this.props.onNodeEdited(node);
  };

  render() {
    return (
      <BlockConfigurator block={this.props.node.data} onBlockChanged={this.onBlockChanged}/>
    );
  }
}


// TODO: Rename to parameter
class BlockConfigurator extends Component {

  onParametersChanged = (parameters) => {
    const block = this.props.block;
    block.parameters = parameters;
    this.props.onBlockChanged(block);
  };

  render() {
    const block = this.props.block;

    return (
      <div>
        <Row>
          <Col>
            <h5>Block parameters</h5>
          </Col>
        </Row>

        <ParametersEngine parameters={block.parameters}
                          supportedParameters={PrimitiveParameters}
                          onParametersChanged={this.onParametersChanged}/>

      </div>
    );
  }
}

const UnknownBlockType = ({type}) => <p>Unknown BlockType '{type}'</p>;

const PropertyDefinitionNotFound = ({type}) => <p>Can't render property '{type}'</p>;
