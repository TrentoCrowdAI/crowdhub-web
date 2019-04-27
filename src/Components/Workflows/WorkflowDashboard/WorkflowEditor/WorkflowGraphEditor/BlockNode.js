import React from 'react';
import {DefaultNodeFactory, DefaultNodeModel, DefaultNodeWidget, PortWidget} from "storm-react-diagrams";
import uuid from 'uuid';

import {deSerializeParameters, serializeParameters} from "../ParametersEngine/parameters/serialization";
import {Card} from "react-bootstrap";
import './BlockNode.css';

export class BlockNodeModel extends DefaultNodeModel {

  blockTypeDefinition;
  initialParametersMap;
  parameterModelsMap;

  deSerialize(block, engine) {
    if (!block.id) {
      this.initializeBlockWithIds(block);
    }
    super.deSerialize(block, engine);
    this.blockTypeDefinition = engine.getBlockTypeDefinition(block.type);
    this.initialParametersMap = block.parameters || {};
    this.setParameterModelsMap(deSerializeParameters(this, this.getParameterDefinitionList()));
  }

  initializeBlockWithIds(block) {
    block.id = uuid();
    block.ports = block.ports.map(port => ({
      ...port,
      id: uuid()
    }));
  }

  serialize() {
    return {
      ...super.serialize(),
      type: this.blockTypeDefinition.name,
      parameters: serializeParameters(this.getParameterModelsMap())
    }
  }

  isValid = () => Object.values(this.getParameterModelsMap()).find(parameter => !parameter.isValid()) == null;

  getId() {
    return this.id;
  }

  getParameterModelsMap() {
    return this.parameterModelsMap;
  }

  setParameterModelsMap(parameterModelsMap) {
    this.parameterModelsMap = parameterModelsMap;
  }

  getParameterDefinitionList() {
    return this.blockTypeDefinition.parameterDefinitions;
  }

  getInitialParametersMap() {
    return this.initialParametersMap;
  }
}

export class BlockNodeWidget extends DefaultNodeWidget {

  render() {
    return (
      <Card className="block">
        <Card.Header>
          <PortWidget name="in" node={this.props.node}/>

          <div className="block-name">
            {this.props.node.name}
          </div>

          <PortWidget name="out" node={this.props.node}/>

          {
            /* Error warning */
            !this.props.node.isValid() &&
            <div className="error-triangle-container">
              <i className="fas fa-exclamation-triangle"/>
            </div>
          }
        </Card.Header>
      </Card>
    );
  }
}

export class BlockNodeFactory extends DefaultNodeFactory {

  blockType;

  constructor(blockType) {
    super(`${blockType}Factory`);
    this.setBlockType(blockType);
  }

  setBlockType(blockType) {
    this.blockType = blockType;
  }

  getType() {
    return this.getBlockType();
  }

  getBlockType() {
    return this.blockType;
  }

  getNewInstance() {
    return new BlockNodeModel();
  }

  generateReactWidget(diagramEngine, node) {
    return React.createElement(BlockNodeWidget, {
      node,
      diagramEngine
    });
  }
}

