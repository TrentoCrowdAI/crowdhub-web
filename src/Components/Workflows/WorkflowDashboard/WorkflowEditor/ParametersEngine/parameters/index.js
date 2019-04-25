import {PrimitiveParameters} from './primitive';
import DoDesign from "./DoDesign";

export const Parameters = {
  ...PrimitiveParameters,


  // composed parameters:
  [DoDesign.type]: DoDesign
};

export const deSerializeParameters = (block, parameterDefinitions) => {
  const parameterModelsMap = {};
  parameterDefinitions.forEach(definition => {
    const name = definition.name;
    const Model = getModelByType(definition.type);
    parameterModelsMap[name] = new Model(definition, block);
  });
  return parameterModelsMap;
};

export const serializeParameters = (parameterModelsMap) => {
  const parameters = {};
  Object.keys(parameterModelsMap).forEach(name => parameters[name] = parameterModelsMap[name].getValue());
  return parameters;
};

const getModelByType = (type) => {
  const parameter = Parameters[type];
  if (!parameter) {
    throw new Error(`unknown parameter of type '${type}'`);
  }
  return parameter.Model;
};
