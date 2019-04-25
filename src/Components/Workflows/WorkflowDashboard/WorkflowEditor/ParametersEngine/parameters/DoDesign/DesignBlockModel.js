import uuid from "uuid";
import {deSerializeParameters} from "../index";

export class DesignBlockModel {

  id;
  designBlockType;
  parameterModelsMap;

  constructor(designBlockType, block) {
    if (!block) {
      block = {
        blockType: designBlockType.type
      };
    }
    this.deSerialize(designBlockType, block);
  }

  deSerialize(designBlockType, block) {
    this.name = designBlockType.name;// TODO: Remove
    this.type = designBlockType.type;
    this.designBlockType = designBlockType;

    this.id = block.id || uuid();
    this.setParameterModelsMap(deSerializeParameters(block, designBlockType.parameterDefinitions));
  }

  serialize() {
    return {
      id: this.id,
      parameters: this.getParameterModelsMap() // TODO: Serialize parameters
    }
  }

  getId() {
    return this.id;
  }

  isValid = () => Object.values(this.getParameterModelsMap()).find(parameter => !parameter.isValid()) == null;


  getParameterModelsMap() {
    return this.parameterModelsMap;
  }

  setParameterModelsMap(parameterModelsMap) {
    this.parameterModelsMap = parameterModelsMap;
  }

  getParameterDefinitionList() {
    return this.designBlockType.parameterDefinitions;
  }
}
