import {DefaultNodeFactory} from "storm-react-diagrams";
import {DefaultBlockNodeModel} from "../models/DefaultBlockNodeModel";
import React from "react";
import {DefaultBlockNodeWidget} from "../widgets/DefaultBlockNodeWidget";

export class DefaultBlockNodeFactory extends DefaultNodeFactory {

  blockType;

  static supportsBlockType (blockType) {
    return true;
  }

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
    return new DefaultBlockNodeModel();
  }

  generateReactWidget(diagramEngine, node) {
    return React.createElement(DefaultBlockNodeWidget, {
      node,
      diagramEngine
    });
  }
}
