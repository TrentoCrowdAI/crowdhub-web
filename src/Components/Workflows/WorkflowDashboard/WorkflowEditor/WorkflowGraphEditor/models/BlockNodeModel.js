import {DefaultNodeModel} from "storm-react-diagrams";
import {deSerializeParameters, serializeParameters} from "../../ParametersEngine/parameters/serialization";
import uuid from "uuid";

export class BlockNodeModel extends DefaultNodeModel {

  blockTypeDefinition;
  initialParametersMap;
  parameterModelsMap;

  deSerialize(block, engine) {
    if (!block.id) {
      this.initializeBlockWithIds(block, engine);
    }
    super.deSerialize(block, engine);
    this.blockTypeDefinition = engine.getBlockTypeDefinition(block.type);
    this.initialParametersMap = block.parameters || {};
    this.setParameterModelsMap(deSerializeParameters(this, this.getParameterDefinitionList()));
  }

  initializeBlockWithIds(block, engine) {
    block.id = engine.getNextBlockId();
    block.ports = block.ports.map(port => ({
      ...port,
      id: uuid()
    }));
  }

  serialize() {
    return {
      ...super.serialize(),
      type: this.blockTypeDefinition.name,
      parameters: serializeParameters(this.getParameterModelsMap())
    }
  }

  isValid = () => Object.values(this.getParameterModelsMap()).find(parameter => !parameter.isValid()) == null;

  getId = () => this.id;

  setId = (id) => this.id = id;

  getParameterModelsMap() {
    return this.parameterModelsMap;
  }

  setParameterModelsMap(parameterModelsMap) {
    this.parameterModelsMap = parameterModelsMap;
  }

  getParameterDefinitionList() {
    return this.blockTypeDefinition.parameterDefinitions;
  }

  getInitialParametersMap() {
    return this.initialParametersMap;
  }
}
