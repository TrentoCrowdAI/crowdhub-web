export const ignoreEventAnd = (callback) => (e) => {
  e.stopPropagation();
  //e.preventDefault();
  callback();
};
