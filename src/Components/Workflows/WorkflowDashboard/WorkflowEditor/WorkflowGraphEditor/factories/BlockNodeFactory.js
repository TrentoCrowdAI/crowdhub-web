import {DefaultNodeFactory} from "storm-react-diagrams";
import {BlockNodeModel} from "../models/BlockNodeModel";
import React from "react";
import {BlockNodeWidget} from "../widgets/BlockNodeWidget";

// TODO: Rename to DefaultBlockNodeFactory
export class BlockNodeFactory extends DefaultNodeFactory {

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
    return new BlockNodeModel();
  }

  generateReactWidget(diagramEngine, node) {
    return React.createElement(BlockNodeWidget, {
      node,
      diagramEngine
    });
  }
}
