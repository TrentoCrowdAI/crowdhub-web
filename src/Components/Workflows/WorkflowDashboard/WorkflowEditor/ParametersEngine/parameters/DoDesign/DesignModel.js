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
    data.value = data.value || [];
    this.value = data.value.map(block => new DesignBlockModel(block));
  }

  isValid() {
    return this.getDesignBlocks().find(block => !block.isValid()) == null;
  }

  getBlocks() {
    console.warn('deprecated');
    return this.getDesignBlocks();
  }

  getDesignBlocks() {
    return this.value;
  }

  isDesignEmpty() {
    return this.getDesignBlocks().length === 0;
  }

  addDesignBlock(newBlock, newBlockIndex) {
    this.getDesignBlocks()
      .splice(newBlockIndex, 0, newBlock);
  }

  swapDesignBlocks (a, b) {
    const blocks = this.getDesignBlocks();
    const temp = blocks[a];
    blocks[a] = blocks[b];
    blocks[b] = temp;
  }
}


export class DesignBlockModel {

  constructor(data) {
    this.deSerialize(data);
  }

  deSerialize({type, parameters, id, name}) {
    this.type = type;
    parameters = parameters || [];
    this.parameters = parameters.map(deSerializeParameter);
    this.id = id || uuid();
    this.name = name;
  }

  serialize() {
    return {
      type: this.type,
      parameters: this.parameters.map(parameter => parameter.serialize())
    }
  }

  isValid() {
    return this.getParameters().find(parameter => !parameter.isValid()) == null;
  }

  getParameters() {
    return this.parameters;
  }
}
