import uuid from 'uuid';

export const textChangeHandler = component => e => {
  const field = e.target;
  component.setState({[field.name]: field.value});
};

export const checkboxChangeHandler = component => e => {
  const field = e.target;
  component.setState({[field.name]: field.checked}, () => validateAndNotify(component));
};

export const selectChangeHandler = component => e => {
  const field = e.target;
  component.setState({[field.name]: field.value}, () => validateAndNotify(component));
};

export const textBlurHandler = component => () => validateAndNotify(component);

export const toggleExpansionHandler = component => expanded => component.setState(
  {expanded},
  () => component.props.onChange(component.state)
);

export const validateAndNotify = component => component.setState({
  valid: component.validate()
}, () => component.props.onChange(component.state));


export const blockState = ({data}, blockSpecificConfig) => {
  return {
    id: data.id,
    type: data.type,
    expanded: data.expanded || false,
    valid: data.valid || false,

    ...blockSpecificConfig
  };
};
