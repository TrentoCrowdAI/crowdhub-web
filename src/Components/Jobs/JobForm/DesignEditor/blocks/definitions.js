import React from 'react';

import InputDynamicText from './input/InputDynamicText';
import InputStaticText from "./input/InputStaticText";
import OutputOpenQuestion from "./output/OutputOpenQuestion";
import OutputChoices from "./output/OutputChoices";
import InputDynamicImage from "./input/InputDynamicImage";

const mapBlocksDefinitionArrayToMap = (blockDefinitions) => {
  const map = {};
  blockDefinitions.forEach(blockDefinition => map[blockDefinition.blockTypeName] = blockDefinition);
  return map;
};

export default mapBlocksDefinitionArrayToMap([
  InputDynamicText,
  InputStaticText,
  InputDynamicImage,

  OutputOpenQuestion,
  OutputChoices
]);
