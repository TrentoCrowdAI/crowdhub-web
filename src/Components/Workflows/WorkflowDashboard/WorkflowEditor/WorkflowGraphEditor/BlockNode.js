import React from 'react';
import {DefaultNodeFactory, DefaultNodeModel, DefaultNodeWidget} from "storm-react-diagrams";
import uuid from 'uuid';

import {deSerializeParameters, serializeParameters} from "../ParametersEngine/parameters";

export class BlockNodeModel extends DefaultNodeModel {

  blockTypeDefinition;
  initialParametersMap;
  parameterModelsMap;

  deSerialize(block, engine) {
    if (!block.id) {
      block.id = uuid();
      block.ports = block.ports.map(port => ({
        ...port,
        id: uuid()
      }));
    }
    super.deSerialize(block, engine);
    this.blockTypeDefinition = engine.getBlockTypeDefinition(block.type);
    this.initialParametersMap = block.parameters || {};
    this.setParameterModelsMap(deSerializeParameters(this, this.getParameterDefinitionList()));
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

  getInitialParametersMap(){
    return this.initialParametersMap;
  }
}

export class BlockNodeWidget extends DefaultNodeWidget {


  render() {
    return (
      <div style={{position: 'relative'}}>
        {
          // TODO: Refactor
          !this.props.node.isValid() &&
          <div style={{position: 'absolute', color: 'yellow', right: 0}}>
            <i className="fas fa-exclamation-triangle"/>
          </div>
        }

        {super.render()}
      </div>
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

