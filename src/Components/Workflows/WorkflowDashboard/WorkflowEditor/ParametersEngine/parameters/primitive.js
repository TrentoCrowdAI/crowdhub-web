import Text from './Text';
import Number from './Number';
import Boolean from './Boolean';
import TextFromDropdown from './TextFromDropdown';
import Html from './Html/Html';
import ChoiceBuilder from './ChoiceBuilder';
import Code from './Code';
import BlockingContext from "./BlockingContext/BlockingContext";
import DoBlockCost from "./DoBlockCost";

const mapParametersArrayToMap = (parameters) => {
  const map = {};
  parameters.forEach(parameter => map[parameter.type] = parameter);
  return map;
};

/**
 * Map of parameters that aren't based on other parameters
 */
export const PrimitiveParameters = mapParametersArrayToMap([
  Text,
  Number,
  Boolean,
  TextFromDropdown,
  Html,
  ChoiceBuilder,
  Code,
  BlockingContext,
  DoBlockCost
]);
