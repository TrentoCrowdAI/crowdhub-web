import React from 'react';
import {DefaultNodeFactory, DefaultNodeModel, DefaultNodeWidget} from "storm-react-diagrams";

import {deSerializeParameter} from "../ParametersEngine/parameters";

export class BlockNodeModel extends DefaultNodeModel {

  data = null;

  deSerialize(object, engine) {
    super.deSerialize(object, engine);
    this.data = object.data;

    this.data.parameters = this.data.parameters.map(deSerializeParameter)
  }


  serialize() {
    return {
      ...super.serialize(),
      data: {
        ...this.data,
        parameters: this.data.parameters.map(parameter => parameter.serialize())
      }
    }
  }

  isValid = () => this.data.parameters.find(parameter => !parameter.isValid()) == null;
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

