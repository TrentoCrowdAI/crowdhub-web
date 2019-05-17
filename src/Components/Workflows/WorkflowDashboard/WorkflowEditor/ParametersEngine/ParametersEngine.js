import React from 'react';
import {Alert, Card} from "react-bootstrap";
import {Parameters} from "./parameters";
import "./ParametersEngine.css";

/**
 * Renders components to edit the parameters of a parametrized model.
 * @param parametrizedBlock object with object with 'getId', 'getParameterDefinitionList' and ' getParameterModelsMap' methods.
 * @param onParameterModelUpdate
 * @returns {*}
 */
export default ({parametrizedBlock, onParameterModelUpdate, disabled, parametersInCard}) => {
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

          if (!parameterModel.shouldDisplay()) {
            return null;
          }

          if (parameterComponent) {
            const Component = parameterComponent.Widget;
            return (
              <ParameterContainer inCard={parametersInCard} title={parameterModel.getDefinition().displayName} key={key}>
                <Component model={parameterModel}
                           onModelUpdated={onParameterModelUpdate}
                           disabled={disabled}/>
              </ParameterContainer>
            );
          } else {
            return <UnsupportedParameter key={key} parameter={parameterDefinition}/>
          }
        })
      }
    </div>
  )
};

const ParameterContainer = ({inCard, title, children}) => {
  if (inCard) {
    return <ParameterContainerCard title={title} children={children}/>;
  } else {
    return <ParameterContainerLineSeparator title={title} children={children}/>
  }
};


export const ParameterContainerCard = ({title, children}) => (
  <Card className="right-sidebar-parameter">
    <Card.Header>{title}</Card.Header>
    <Card.Body>
      {children}
    </Card.Body>
  </Card>
);

const ParameterContainerLineSeparator = ({title, children}) => (
  <div className="parameter-container-line-separator">
    <h6>{title}</h6>
    {children}
  </div>
);

const UnsupportedParameter = ({parameter}) => (
  <Alert variant="danger">
    Error: Unknown parameter '{parameter.name}' of type '{parameter.type}'.
  </Alert>
);

