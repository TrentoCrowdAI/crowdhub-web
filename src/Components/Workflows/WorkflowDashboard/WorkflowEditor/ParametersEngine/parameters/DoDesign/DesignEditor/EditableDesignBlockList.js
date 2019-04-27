import React from 'react';
import CollapsableCard from "./CollapsableCard";
import ParametersEngine from "../../../ParametersEngine";

const EditableDesignBlockList = ({componentsContainerRef, designBlocksModel, onParameterModelUpdate}) => {
  return (
    <div>
      <h5>Your job design</h5>
      <div ref={componentsContainerRef} style={{minHeight: '100px'}}>
        {
          designBlocksModel.getBlockModels().map(designBlockModel => {
            return (
              <DesignBlockConfigurator
                designBlockTypeDefinitions={designBlocksModel.getDesignBlockTypeDefinitions()}
                key={designBlockModel.getId()}
                designBlockModel={designBlockModel}
                onParameterModelUpdate={onParameterModelUpdate}/>
            );
          })
        }
      </div>
    </div>
  );
};

export default EditableDesignBlockList;

const DesignBlockConfigurator = ({designBlockModel, onParameterModelUpdate}) => (
  <div data-block-id={designBlockModel.getId()}>
    <CollapsableCard title={designBlockModel.getDesignBlockTypeDefinition().displayName}
                     invalid={!designBlockModel.isValid()}>
      <ParametersEngine
        parametrizedBlock={designBlockModel}
        onParameterModelUpdate={onParameterModelUpdate}/>
    </CollapsableCard>
  </div>
);
