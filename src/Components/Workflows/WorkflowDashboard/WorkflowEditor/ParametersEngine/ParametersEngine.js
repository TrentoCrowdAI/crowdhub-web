import React, {Component} from 'react';
import {Alert} from "react-bootstrap";

export default ({parameters, supportedParameters, parametersContainerId, onParameterModelUpdate}) => (
  <div>
    {
      parameters.map((parameter) => {
        const parameterComponent = supportedParameters[parameter.type];
        const key = `${parametersContainerId}-${parameter.name}`;

        if (parameterComponent) {
          const Component = parameterComponent.Widget;
          return (
            <div key={key}>
              <Component model={parameter}
                         onModelUpdated={onParameterModelUpdate}/>
              <hr/>
            </div>
          );
        } else {
          return <UnsupportedParameter key={key} parameter={parameter}/>
        }

      })
    }
  </div>
);


const UnsupportedParameter = ({parameter}) => (
  <Alert variant="danger">
    Error: Unknown parameter '{parameter.name}' of type '{parameter.type}'
  </Alert>
);

