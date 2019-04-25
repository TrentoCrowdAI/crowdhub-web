export default class AbstractParameterModel {

  value;
  definition = null;
  block = null;

  constructor(definition, block) {
    this.deSerialize(definition, block);
  }

  deSerialize(definition, block) {
    this.definition = definition;
    this.block = block;
    if (!block.parameters || block.parameters[this.getName()] === undefined) {
      this.setValue(this.getDefinition().default);
    } else {
      this.value = block.parameters[this.getName()];
    }
  }

  serialize () {
    console.log(this);
    return this.getValue();
  }

  isValid() {
    return false;
  }

  getDefinition () {
    return this.definition;
  }

  getName () {
    return this.getDefinition().name;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
  }
}
