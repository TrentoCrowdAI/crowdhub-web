import React from 'react';
import {Card} from "react-bootstrap";

const DraggableDesignBlockTypeList = ({componentsContainerRef, designBlockTypeDefinitions}) => (
  <div>
    <h5>Design blocks</h5>

    <div ref={componentsContainerRef}>
      {
        designBlockTypeDefinitions.map(definition => {
          return (
            <Card key={definition.name} data-block-type-definition={JSON.stringify(definition)} className="mb-2">
              <Card.Header>{definition.displayName}</Card.Header>
            </Card>
          );
        })
      }
    </div>
  </div>
);

export default DraggableDesignBlockTypeList;
