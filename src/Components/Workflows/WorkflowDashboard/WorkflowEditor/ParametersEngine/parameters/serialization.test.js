import {deSerializeParameters, serializeParameters} from "./serialization";

const deserializeNumberParameter = () => {
  const blockModel = {
    getInitialParametersMap: () => ({cost: 2})
  };
  const parameterDefinitions = [{
    name: "cost",
    displayName: "Cost",
    description: "Costs in cents",
    default: 1,
    required: true,
    type: "number"
  }];

  return deSerializeParameters(blockModel, parameterDefinitions);
};

describe('test deSerialization', () => {

  it('deSerializes a parameter', () => {
    const parameterModelsMap = deserializeNumberParameter();

    // then
    const parameterModel = parameterModelsMap.cost;
    expect(parameterModel).toBeDefined();
    expect(parameterModel.getValue()).toBe(2);
  });
});

describe('test serialization', () => {
  it('serializes one parameter', () => {
    // given
    const parameterModelsMap = deserializeNumberParameter();
    const parameterModel = parameterModelsMap.cost;
    parameterModel.setValue(10);

    // when
    const serializedParametersMap = serializeParameters(parameterModelsMap);

    // then
    expect(serializedParametersMap.cost).toBe(10);
  });
});
