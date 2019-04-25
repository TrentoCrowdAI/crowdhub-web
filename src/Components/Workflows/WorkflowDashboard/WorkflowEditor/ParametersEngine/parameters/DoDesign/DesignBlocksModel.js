import {DesignBlockModel} from "./DesignBlockModel";

export class DesignBlocksModel {

  blocks;

  designBlockTypes;

  constructor(designBlockTypes, blocks) { // TODO: Clash con blocks (deSerialized and Pojo)
    this.deSerialize(designBlockTypes, blocks);
    this.designBlockTypes = designBlockTypes;
  }

  deSerialize(designBlockTypes, blocks) {
    this.setBlocks(
      blocks.map(block => {
        const designBlockType = designBlockTypes.find(designBlockType => designBlockType.type === block.type);
        return new DesignBlockModel(designBlockType, block);
      })
    );
  }

  getBlocks() {
    return this.blocks;
  }

  setBlocks(blocks) {
    this.blocks = blocks;
  }

  clone() {

    return new DesignBlocksModel(this.designBlockTypes, this.serialize());
  }

  serialize() {
    return this.getBlocks().map(designBlock => designBlock.serialize());
  }

  isDesignEmpty() {
    return this.getBlocks().length === 0;
  }

  addBlock(newBlock, newBlockIndex) {
    this.getBlocks()
      .splice(newBlockIndex, 0, newBlock);
    console.log('after add', this)
  }

  swapBlocks(a, b) {
    const blocks = this.getBlocks();
    const temp = blocks[a];
    blocks[a] = blocks[b];
    blocks[b] = temp;
  }

  removeBlockById(id) {
    const blocks = this.getBlocks();
    const index = blocks.findIndex(block => block.id === id);
    if (index >= 0) {
      blocks.splice(index, 1);
    }
  }

  isValid() {
    return this.getBlocks().find(block => !block.isValid()) == null;
  }
}
