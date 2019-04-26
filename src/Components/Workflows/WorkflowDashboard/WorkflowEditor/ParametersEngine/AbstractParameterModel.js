export default class AbstractParameterModel {

  value;
  definition;
  blockModel;

  constructor(definition, blockModel) {
    this.deSerialize(definition, blockModel);
  }

  deSerialize(definition, blockModel) {
    this.definition = definition;
    this.blockModel = blockModel;
    const initialParametersMap = blockModel.getInitialParametersMap();
    this.setValue(initialParametersMap[this.getName()]);
    if (this.getValue() === undefined) {
      this.setValue(this.getDefinition().default);
    }
  }

  serialize() {
    return this.getValue();
  }

  isValid() {
    return false;
  }

  isRequired(){
    return this.getDefinition().required;
  }

  getDefinition() {
    return this.definition;
  }

  getName() {
    return this.getDefinition().name;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
  }

  shouldDisplay() {
    if (this.isOptional()) {
      return this.isConditionMet();
    }
    return true;
  }

  isOptional() {
    return !!this.getCondition();
  }

  isConditionMet() {
    const condition = this.getCondition();
    const parameterModelsMap = this.blockModel.getParameterModelsMap();
    return !!parameterModelsMap[condition].getValue()
  }

  getCondition() {
    return this.getDefinition().condition;
  }
}
