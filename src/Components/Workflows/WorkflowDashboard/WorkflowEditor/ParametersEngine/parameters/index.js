import {PrimitiveParameters} from './primitive';
import DoDesign from "./DoDesign";

export const Parameters = {
  ...PrimitiveParameters,


  // composed parameters:
  [DoDesign.type]: DoDesign
};

export const getModelByType = (type) => {
  const parameter = Parameters[type];
  if (!parameter) {
    throw new Error(`unknown parameter of type '${type}'`);
  }
  return parameter.Model;
};
