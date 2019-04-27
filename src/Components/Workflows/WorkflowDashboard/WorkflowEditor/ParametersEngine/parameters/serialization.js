import {getModelByType} from "./index";

/**
 * Given a parametrized model and the parameter definitions, created a map of parameter models.
 * @param blockModel
 * @param parameterDefinitions
 */
export const deSerializeParameters = (blockModel, parameterDefinitions) => {
  const parameterModelsMap = {};
  parameterDefinitions.forEach(definition => {
    const name = definition.name;
    const Model = getModelByType(definition.type);
    parameterModelsMap[name] = new Model(definition, blockModel);
  });
  return parameterModelsMap;
};

/**
 * Given the parameter models map created with 'deSerializeParameters' returns a map with the parameter values
 * @param parameterModelsMap
 */
export const serializeParameters = (parameterModelsMap) => {
  const parameters = {};
  Object.keys(parameterModelsMap).forEach(name => parameters[name] = parameterModelsMap[name].serialize());
  return parameters;
};
