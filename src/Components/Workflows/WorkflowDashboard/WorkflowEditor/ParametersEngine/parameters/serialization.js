import {getModelByType} from "./index";

export const deSerializeParameters = (blockModel, parameterDefinitions) => {
  const parameterModelsMap = {};
  parameterDefinitions.forEach(definition => {
    const name = definition.name;
    const Model = getModelByType(definition.type);
    parameterModelsMap[name] = new Model(definition, blockModel);
  });
  return parameterModelsMap;
};

export const serializeParameters = (parameterModelsMap) => {
  const parameters = {};
  Object.keys(parameterModelsMap).forEach(name => parameters[name] = parameterModelsMap[name].serialize());
  return parameters;
};
