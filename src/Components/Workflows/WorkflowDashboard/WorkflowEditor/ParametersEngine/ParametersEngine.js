import React, {Component} from 'react';
import {Alert} from "react-bootstrap";
import uuid from 'uuid';

export default class ParametersEngine extends Component {

  onParameterValueChanged = (index) => (value, isValid) => {
    const {parameters} = this.props;
    parameters[index] = {
      ...parameters[index],
      value,
      isValid
    };
    this.props.onParametersChanged(parameters);
  };

  render() {
    const {parameters, supportedParameters} = this.props;
    const objectId = uuid(); // TODO: Replace with node id
    return (
      <div>
        {
          parameters.map((parameter, index) => {
            const parameterComponent = supportedParameters[parameter.type];
            const key = `${objectId}-${parameter.name}`;

            if (parameterComponent) {
              const Component = parameterComponent.Component;
              return <Component key={key} parameter={parameter} onValueChanged={this.onParameterValueChanged(index)}/>;
            } else {
              return <UnsupportedParameter key={key} parameter={parameter}/>
            }

          })
        }
      </div>
    )
  }
}

const UnsupportedParameter = ({parameter}) => (
  <Alert variant="danger">
    Error: Unknown parameter '{parameter.name}' of type '{parameter.type}'
  </Alert>
);

