import React from 'react';
import {DefaultNodeFactory, DefaultNodeModel, DefaultNodeWidget, NodeWidget} from "storm-react-diagrams";

export class BlockNodeModel extends DefaultNodeModel {

  data = null;

  deSerialize(object, engine) {
    super.deSerialize(object, engine);
    this.data = object.data;
  }


  serialize() {
    return {
      ...super.serialize(),
      data: this.data
    }
  }
}

export class BlockNodeWidget extends DefaultNodeWidget {

  isNodeValid = () => this.props.node.data.parameters.find(parameter => !parameter.isValid) == null;

  render() {
    return (
      <div style={{position: 'relative'}}>
        {
          // TODO: Refactor
          !this.isNodeValid() &&
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

