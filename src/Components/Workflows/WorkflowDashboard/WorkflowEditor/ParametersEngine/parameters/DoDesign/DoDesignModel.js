import AbstractParameterModel from "../../AbstractParameterModel";
import {DesignBlocksModel} from "./DesignBlocksModel";

export class DoDesignModel extends AbstractParameterModel {

  blocksModel;

  constructor(definition, block) {
    super(definition, block);
  }

  deSerialize(definition, block) {
    super.deSerialize(definition, block);
    this.blocksModel = new DesignBlocksModel(definition.designBlockTypes, this.getDesign().blocks || []);
  }

  serialize() {
    return {
      blocks: this.getBlocksModel().serialize()
    };
  }

  getDesign() {
    return this.getValue();
  }

  getBlocksModel() {
    return this.blocksModel;
  }

  setBlocksModel(blocksModel) {
    this.blocksModel = blocksModel;
  }

  isValid() {
    return this.getBlocksModel().isValid();
  }

  isDesignEmpty() {
    return this.getBlocksModel().isDesignEmpty();
  }
}


