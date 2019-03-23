import React from 'react';

import InputDynamicText from './input/InputDynamicText';
import InputStaticText from "./input/InputStaticText";
import OutputOpenQuestion from "./output/OutputOpenQuestion";

const mapBlocksDefinitionArrayToMap = (blockDefinitions) => {
  const map = {};
  blockDefinitions.forEach(blockDefinition => map[blockDefinition.blockTypeName] = blockDefinition);
  return map;
};

export default mapBlocksDefinitionArrayToMap([
  InputDynamicText,
  InputStaticText,

  OutputOpenQuestion
]);
