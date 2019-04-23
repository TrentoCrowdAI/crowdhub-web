import AbstractParameterModel from "../../AbstractParameterModel";
import {deSerializeParameter} from "../index";

import uuid from 'uuid';

export class DoDesignModel extends AbstractParameterModel {

  constructor(data) {
    super();
    if (data) {
      this.deSerialize(data);
    }
  }

  deSerialize(data) {
    super.deSerialize(data);
    this.setBlocksModel(new DesignBlocksModel(data.value));

  }

  getBlocksModel() {
    return this.getValue();
  }

  setBlocksModel(blocksModel) {
    this.setValue(blocksModel)
  };

  isValid() {
    return this.getBlocksModel().isValid();
  }

  isDesignEmpty() {
    return this.getBlocksModel().isDesignEmpty();
  }
}

export class DesignBlocksModel {

  blocks = [];

  constructor(data) {
    if (data) {
      this.deSerialize(data);
    }
  }

  deSerialize(data) {
    this.blocks = data.blocks.map(block => new DesignBlockModel(block));
  }

  getBlocks() {
    return this.blocks;
  }

  isDesignEmpty() {
    return this.getBlocks().length === 0;
  }

  addBlock(newBlock, newBlockIndex) {
    this.getBlocks()
      .splice(newBlockIndex, 0, newBlock);
  }

  swapBlocks(a, b) {
    const blocks = this.getBlocks();
    const temp = blocks[a];
    blocks[a] = blocks[b];
    blocks[b] = temp;
  }

  isValid() {
    return this.getBlocks().find(block => !block.isValid()) == null;
  }
}


export class DesignBlockModel {

  constructor(data) {
    if (data) {
      this.deSerialize(data);
    }
  }

  deSerialize({type, parameters, id, name}) {
    this.id = id || uuid();
    this.type = type;
    this.name = name;
    this.parameters = parameters ? parameters.map(deSerializeParameter) : [];
  }

  isValid() {
    return this.getParameters().find(parameter => !parameter.isValid()) == null;
  }

  getParameters() {
    return this.parameters;
  }
}
