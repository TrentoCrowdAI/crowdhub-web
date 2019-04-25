export default class AbstractParameterModel {

  definition = null;
  block = null;

  constructor(definition, block) {
    this.deSerialize(definition, block);
  }

  deSerialize(definition, block) {
    this.definition = definition;
    this.block = block;
    if (this.getValue() === undefined) {
      this.setValue(this.getDefinition().default);
    }
  }

  serialize () {
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
    return this.block[this.getName()];
  }

  setValue(value) {
    this.block[this.getName()] = value;
  }
}
