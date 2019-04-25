import React, {Component} from 'react';
import {Card} from "react-bootstrap";

export default class DraggableDesignBlockTypeList extends Component {

  render() {
    return (
      <div>
        <h5>Design blocks</h5>

        <div ref={this.props.componentsContainerRef}>
          {
            this.props.designBlockTypes.map(blockType => {
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
