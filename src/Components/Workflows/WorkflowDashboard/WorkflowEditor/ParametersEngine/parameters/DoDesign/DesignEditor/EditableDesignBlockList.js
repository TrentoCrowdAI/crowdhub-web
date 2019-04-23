import React, {Component} from 'react';
import {Card} from "react-bootstrap";

export default class EditableDesignBlockList extends Component {
  render() {
    return (
      <div>
        <h5>Your job design</h5>

        <div ref={this.props.componentsContainerRef} style={{minHeight: '100px'}}>
          {
            this.props.designModel.getDesignBlocks().map(block => {
              return (
                <Card key={block.id} data-block-id={block.id}>
                  <Card.Header>{block.name}</Card.Header>
                  <Card.Body>
                   {/* <ParametersEngine
                      parametersContainerId={block.id}
                      parameters={block.parameters}
                      onParameterModelUpdate={console.log}
                      supportedParameters={Parameters}/>*/}
                  </Card.Body>
                </Card>
              );
            })
          }
        </div>
      </div>
    );
  }
}
