import React, {Component} from 'react';
import CollapsableCard from "./CollapsableCard";
import ParametersEngine from "../../../ParametersEngine";

export default class EditableDesignBlockList extends Component {
  render() {
    return (
      <div>
        <h5>Your job design</h5>
        <div ref={this.props.componentsContainerRef} style={{minHeight: '100px'}}>
          {
            this.props.designModel.getBlocks().map(block => {
              return (
                <DesignBlockConfigurator designBlockTypes={this.props.designBlockTypes}
                                         key={block.id} block={block}
                                         onParameterModelUpdate={this.props.onParameterModelUpdate}/>
              );
            })
          }
        </div>
      </div>
    );
  }
}


class DesignBlockConfigurator extends Component {

  render() {
    const block = this.props.block;

    return (
      <div data-block-id={block.id}>
        <CollapsableCard title={block.name} invalid={!block.isValid()}>
          <ParametersEngine
            parametrizedBlock={block}
            onParameterModelUpdate={this.props.onParameterModelUpdate}/>
        </CollapsableCard>
      </div>
    );
  }
}
