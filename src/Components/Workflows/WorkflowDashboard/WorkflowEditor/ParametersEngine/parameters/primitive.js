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
