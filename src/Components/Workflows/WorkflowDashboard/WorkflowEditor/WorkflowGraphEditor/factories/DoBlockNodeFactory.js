import React from "react";
import {BlockNodeWidget} from "../widgets/BlockNodeWidget";
import {BlockNodeFactory} from "./BlockNodeFactory";
import {DoBlockNodeModel} from "../models/DoBlockNodeModel";

export class DoBlockNodeFactory extends BlockNodeFactory {

  static supportsBlockType (blockType) {
    return blockType === "do";
  }

  constructor(blockType) {
    super(`DoBlock`);
    this.setBlockType(blockType);
  }

  getNewInstance() {
    return new DoBlockNodeModel();
  }

  generateReactWidget(diagramEngine, node) {
    return React.createElement(BlockNodeWidget, {
      node,
      diagramEngine
    });
  }
}
