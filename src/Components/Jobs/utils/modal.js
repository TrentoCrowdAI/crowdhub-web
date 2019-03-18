export const closeAndAfterAnimation = (component, callback) => () => {
  component.setState({show: false});

  setTimeout(callback, 100);
};

