import {DesignBlockModel} from "./DesignBlockModel";

export class DesignBlocksModel {

  designBlockTypeDefinitions;
  blockModels;

  constructor(designBlockTypeDefinitions, blocks) {
    this.deSerialize(designBlockTypeDefinitions, blocks);
  }

  deSerialize(designBlockTypeDefinitions, blocks) {
    this.setDesignBlockTypeDefinitions(designBlockTypeDefinitions);
    this.setBlockModels(blocks.map(block => new DesignBlockModel(
      this.getDesignBlockTypeDefinition(block.type),
      block
    )));
  }

  setDesignBlockTypeDefinitions(designBlockTypeDefinitions) {
    this.designBlockTypeDefinitions = designBlockTypeDefinitions;
  }

  getDesignBlockTypeDefinition(designBlockType) {
    return this.getDesignBlockTypeDefinitions().find(definition => definition.name === designBlockType);
  }

  getDesignBlockTypeDefinitions() {
    return this.designBlockTypeDefinitions;
  }

  getBlockModels() {
    return this.blockModels;
  }

  setBlockModels(blockModels) {
    this.blockModels = blockModels;
  }

  clone() {
    return new DesignBlocksModel(this.getDesignBlockTypeDefinitions(), this.serialize());
  }

  serialize() {
    return this.getBlockModels().map(designBlock => designBlock.serialize());
  }

  isDesignEmpty() {
    return this.getBlockModels().length === 0;
  }

  addBlock(newBlock, newBlockIndex) {
    this.getBlockModels().splice(newBlockIndex, 0, newBlock);
  }

  swapBlocks(a, b) {
    const blocks = this.getBlockModels();
    const temp = blocks[a];
    blocks[a] = blocks[b];
    blocks[b] = temp;
  }

  removeBlockById(id) {
    const blocks = this.getBlockModels();
    const index = blocks.findIndex(block => block.id === id);
    if (index >= 0) {
      blocks.splice(index, 1);
    }
  }

  isValid() {
    return this.getBlockModels().find(block => !block.isValid()) == null;
  }
}
