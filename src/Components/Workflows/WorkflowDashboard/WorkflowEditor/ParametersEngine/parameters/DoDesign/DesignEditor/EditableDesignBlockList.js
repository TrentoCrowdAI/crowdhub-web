import React, {Component} from 'react';
import {Card} from "react-bootstrap";

import ParametersEngine from "../../../ParametersEngine";
import {Parameters} from "../../index";
import CollapsableCard from "./CollapsableCard";

export default class EditableDesignBlockList extends Component {
  render() {
    return (
      <div>
        <h5>Your job design</h5>
        <div ref={this.props.componentsContainerRef} style={{minHeight: '100px'}}>
          {
            this.props.designModel.getBlocks().map(block => {
              return (
                <DesignBlockConfigurator key={block.id} block={block} onParameterModelUpdate={this.props.onParameterModelUpdate}/>
              );
            })
          }
        </div>
      </div>
    );
  }
}


class DesignBlockConfigurator extends Component {

  state = {
    expanded: false
  };

  render() {
    const block = this.props.block;
    return (
      <CollapsableCard title={block.name} invalid={!block.isValid()}>
        <ParametersEngine
          parametersContainerId={block.id}
          parameters={block.parameters}
          onParameterModelUpdate={this.props.onParameterModelUpdate}
          supportedParameters={Parameters}/>
      </CollapsableCard>
    );
  }
}
