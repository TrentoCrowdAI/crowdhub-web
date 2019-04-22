export default class AbstractParameterModel {
  deSerialize({required, name, type, value, displayName, description}) {
    this.required = required;
    this.name = name;
    this.displayName = displayName || name;
    this.type = type;
    this.value = value;
    this.description = description;
  }

  serialize() {
    return {
      required: this.required,
      name: this.name,
      type: this.type,
      value: this.value,
      displayName: this.displayName,
      description: this.description
    }
  }

  isValid() {
    return false;
  }

  getDescription() {
    return this.description;
  }

  getDisplayName() {
    return this.displayName;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
  }
}
