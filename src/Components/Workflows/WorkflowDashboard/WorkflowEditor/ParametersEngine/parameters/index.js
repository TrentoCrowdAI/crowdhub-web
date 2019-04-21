import Text from './Text';
import Number from './Number';

const mapParametersArrayToMap = (parameters) => {
    const map = {};
    parameters.forEach(parameter => map[parameter.type] = parameter);
    return map;
};

export const PrimitiveParameters = mapParametersArrayToMap([
  Text,
  Number
]);
