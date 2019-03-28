// TODO: Generalize
export const objectClonerWithoutField = object => field => {
  const clone = {...object};
  delete clone[field];
  return clone;
};
