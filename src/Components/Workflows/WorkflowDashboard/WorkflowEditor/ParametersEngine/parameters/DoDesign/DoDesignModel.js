import AbstractParameterModel from "../../AbstractParameterModel";
import {DesignBlocksModel} from "./DesignBlocksModel";

export class DoDesignModel extends AbstractParameterModel {

  blocksModel;

  deSerialize(definition, block) {
    super.deSerialize(definition, block);
    this.setBlocksModel(new DesignBlocksModel(
      definition.designBlockTypeDefinitions,
      this.getDesign().blocks
    ));
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


