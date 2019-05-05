import React from 'react';
import {Alert} from "react-bootstrap";
import {Parameters} from "./parameters";

/**
 * Renders components to edit the parameters of a parametrized model.
 * @param parametrizedBlock object with object with 'getId', 'getParameterDefinitionList' and ' getParameterModelsMap' methods.
 * @param onParameterModelUpdate
 * @returns {*}
 */
export default ({parametrizedBlock, onParameterModelUpdate, disabled}) => {
  const id = parametrizedBlock.getId();
  const parameterModelsMap = parametrizedBlock.getParameterModelsMap();
  const parameterDefinitions = parametrizedBlock.getParameterDefinitionList();

  return (
    <div>
      {
        parameterDefinitions.map((parameterDefinition) => {
          const parameterComponent = Parameters[parameterDefinition.type];
          const key = `${id}-${parameterDefinition.name}`;
          const parameterModel = parameterModelsMap[parameterDefinition.name];

          if (parameterComponent) {
            const Component = parameterComponent.Widget;
            return (
              <div key={key}>
                {
                  parameterModel.shouldDisplay() &&
                  <div>
                    <hr/>
                    <Component model={parameterModel}
                               onModelUpdated={onParameterModelUpdate}
                               disabled={disabled}/>
                  </div>
                }
              </div>
            );
          } else {
            return <UnsupportedParameter key={key} parameter={parameterDefinition}/>
          }
        })
      }
    </div>
  )
};

const UnsupportedParameter = ({parameter}) => (
  <Alert variant="danger">
    Error: Unknown parameter '{parameter.name}' of type '{parameter.type}'.
  </Alert>
);

