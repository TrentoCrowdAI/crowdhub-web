import AbstractParameterModel from "./AbstractParameterModel";

const parameterDefinition = {
  name: "cost",
  displayName: "Cost",
  description: "Costs in cents",
  default: 1,
  required: true,
  type: "number"
};

const block = {
  getInitialParametersMap: () => ({cost: 2})
};

describe('test a model deserialization', () => {


  it('should deserialize the parameter from the block', () => {
    const parameterModel = new AbstractParameterModel(parameterDefinition, block);

    expect(parameterModel.getValue()).toBe(2);
  });

  it('should assign default value if non given', () => {
    const blockWithoutValues = {
      getInitialParametersMap: () => ({})
    };
    const parameterModel = new AbstractParameterModel(parameterDefinition, blockWithoutValues);

    expect(parameterModel.getValue()).toBe(1);
  });

});


describe('test a model serialization', () => {


  it('should serialize with the new value', () => {
    // given
    const parameterModel = new AbstractParameterModel(parameterDefinition, block);
    parameterModel.setValue(3);

    // when
    const serialized = parameterModel.serialize();

    // then
    expect(serialized).toBe(3);
  });

});

describe('test optional parameters', () => {

  const createBlockWithParameterValue=(parameterName, value) => ({
    getInitialParametersMap: () => ({}),
    getParameterModelsMap: () => ({
      [parameterName]: {
        getValue: () => value
      }
    })
  });

  const definitionB = {
    ...parameterDefinition,
    condition: 'a'
  };

  test('parameter should be displayed if condition is met', () => {
    const block = createBlockWithParameterValue('a', true);

    const model = new AbstractParameterModel(definitionB, block);

    expect(model.shouldDisplay()).toBe(true);
  });


  test('parameter should not be displayed if condition is not met', () => {
    const block = createBlockWithParameterValue('a', false);

    const model = new AbstractParameterModel(definitionB, block);

    expect(model.shouldDisplay()).toBe(false);
  });
});
