import uuid from "uuid";
import {deSerializeParameters} from "../serialization";
import {serializeParameters} from "../serialization";

export class DesignBlockModel {

  id;
  designBlockTypeDefinition;
  parameterModelsMap;
  initialParametersMap;

  constructor(designBlockTypeDefinition, block) {
    this.deSerialize(designBlockTypeDefinition, block);
  }

  deSerialize(designBlockTypeDefinition, block) {
    this.setDesignBlockTypeDefinition(designBlockTypeDefinition);
    this.type = block ? block.type : designBlockTypeDefinition.name;
    this.id = (block && block.id) ? block.id : uuid();
    this.initialParametersMap = block.parameters || {};
    this.setParameterModelsMap(deSerializeParameters(this, designBlockTypeDefinition.parameterDefinitions));
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


  getInitialParametersMap(){
    return this.initialParametersMap;
  }
}
