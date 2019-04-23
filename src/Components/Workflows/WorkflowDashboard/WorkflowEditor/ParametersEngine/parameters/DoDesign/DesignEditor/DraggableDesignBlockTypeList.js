import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import DesignBlockTypesService from "../../../../../../../../Services/DesignBlockTypesService";

export default class DraggableDesignBlockTypeList extends Component {

  state = {
    designBlocks: DesignBlockTypesService.getDesignBlockTypes()
  };

  render() {
    return (
      <div>
        <h5>Design blocks</h5>

        <div ref={this.props.componentsContainerRef}>
          {
            this.state.designBlocks.map(blockType => {
              return (
                <Card key={blockType.type} data-block-type={JSON.stringify(blockType)} className="mb-2">
                  <Card.Header>{blockType.name}</Card.Header>
                </Card>
              );
            })
          }
        </div>
      </div>
    );
  }
}
