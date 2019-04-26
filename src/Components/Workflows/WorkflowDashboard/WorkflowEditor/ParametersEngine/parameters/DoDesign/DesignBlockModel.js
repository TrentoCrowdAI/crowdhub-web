import uuid from "uuid";
import {deSerializeParameters, serializeParameters} from "../index";

export class DesignBlockModel {

  id;
  designBlockTypeDefinition;
  parameterModelsMap;

  constructor(designBlockTypeDefinition, block) {
    this.deSerialize(designBlockTypeDefinition, block);
  }

  deSerialize(designBlockTypeDefinition, block) {
    this.setDesignBlockTypeDefinition(designBlockTypeDefinition);
    this.type = block ? block.type : designBlockTypeDefinition.name;
    this.id = (block && block.id) ? block.id : uuid();
    this.setParameterModelsMap(deSerializeParameters(block || {}, designBlockTypeDefinition.parameterDefinitions)); // TODO: Replace block with model
  }

  setDesignBlockTypeDefinition(designBlockTypeDefinition) {
    this.designBlockTypeDefinition = designBlockTypeDefinition;
  }

  getDesignBlockTypeDefinition() {
    return this.designBlockTypeDefinition;
  }

  serialize() {
    return {
      id: this.id,
      type: this.type,
      parameters: serializeParameters(this.getParameterModelsMap())
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
    return this.getDesignBlockTypeDefinition().parameterDefinitions;
  }
}
