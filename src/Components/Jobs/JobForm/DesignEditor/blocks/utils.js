export const textChangeHandler = component => e => {
  const field = e.target;
  component.setState({[field.name]: field.value});
};

export const checkboxChangeHandler = component => e => {
  const field = e.target;
  component.setState({[field.name]: field.checked}, () => component.props.onChange(component.state))
};

export const selectChangeHandler = component => e => {
  const field = e.target;
  component.setState({[field.name]: field.value}, () => component.props.onChange(component.state))
};

export const textBlurHandler = component => () => component.props.onChange(component.state);

export const toggleExpansionHandler = component => expanded => component.setState(
  {expanded},
  () => component.props.onChange(component.state)
);
