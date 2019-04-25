import React from 'react';
import {DefaultNodeFactory, DefaultNodeModel, DefaultNodeWidget} from "storm-react-diagrams";

import {deSerializeParameters, serializeParameters} from "../ParametersEngine/parameters";

export class BlockNodeModel extends DefaultNodeModel {

  blockType;
  parameterModelsMap;

  deSerialize(block, engine) {
    super.deSerialize(block, engine);

    // Find the BlockType definition given the id
    // TODO: It is difficult to differentiate between actual BlockType and BlockType name
    const blockType = this.blockType = engine.blockTypes.find(blockType => blockType.data.blockType === block.blockType).data;
    this.setParameterModelsMap(deSerializeParameters(block, blockType.parameterDefinitions));
  }

  serialize() {
    return {
      ...super.serialize(),
      blockType: this.blockType,
      parameters: serializeParameters(this.parameters)
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
    return this.blockType.parameterDefinitions;
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
  constructor() {
    super("blockNode");
  }

  getType() {
    return "blockNode";
  }

  getNewInstance() {
    return new BlockNodeModel();
  }


  generateReactWidget(diagramEngine, node) {
    return React.createElement(BlockNodeWidget, {
      node: node,
      diagramEngine: diagramEngine
    });
  }
}

