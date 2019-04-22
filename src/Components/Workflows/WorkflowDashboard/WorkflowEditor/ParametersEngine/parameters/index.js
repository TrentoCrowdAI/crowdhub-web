import Text from './Text';
import Number from './Number';
import Boolean from './Boolean';

const mapParametersArrayToMap = (parameters) => {
  const map = {};
  parameters.forEach(parameter => map[parameter.type] = parameter);
  return map;
};

export const PrimitiveParameters = mapParametersArrayToMap([
  Text,
  Number,
  Boolean
]);

export const deSerializeParameter = (data) => {
  const Model = getModelByType(data.type);
  const instance = new Model();
  instance.deSerialize(data);
  return instance;
};

const getModelByType=(type) => {
  const parameter = PrimitiveParameters[type];
  if(!parameter) {
    throw new Error(`unknown parameter of type '${type}'`);
  }
  return parameter.Model;
};
