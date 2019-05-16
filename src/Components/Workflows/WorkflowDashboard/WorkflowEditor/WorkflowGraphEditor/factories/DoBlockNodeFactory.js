import React from "react";
import {DefaultBlockNodeWidget} from "../widgets/DefaultBlockNodeWidget";
import {DefaultBlockNodeFactory} from "./DefaultBlockNodeFactory";
import {DoBlockNodeModel} from "../models/DoBlockNodeModel";

export class DoBlockNodeFactory extends DefaultBlockNodeFactory {

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
    return React.createElement(DefaultBlockNodeWidget, {
      node,
      diagramEngine
    });
  }
}
