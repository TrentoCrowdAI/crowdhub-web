import Number from './Number';

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

describe('test NumberModel validation', () => {

  it('a number value is valid', () => {
    // given
    const parameterModel = new Number.Model(parameterDefinition, block);

    // when
    parameterModel.setValue(5);

    // then
    expect(parameterModel.isValid()).toBe(true);
  });

  it('NaN is not valid if parameter required', () => {
    // given
    const parameterModel = new Number.Model(parameterDefinition, block);

    // when
    parameterModel.setValue(NaN);

    // then
    expect(parameterModel.isValid()).toBe(false);
  });

  it('NaN is valid if parameter is not required', () => {
    // given
    const definition = {
      ...parameterDefinition,
      required: false
    };
    const parameterModel = new Number.Model(definition, block);

    // when
    parameterModel.setValue(NaN);

    // then
    expect(parameterModel.isValid()).toBe(true);
  });

});
